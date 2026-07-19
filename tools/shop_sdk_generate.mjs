#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HTTP_METHODS = new Set(['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace']);
const SDK_OWNER = 'sdkwork-shop';
const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const generatorBin = path.resolve(workspaceRoot, '..', 'sdkwork-sdk-generator', 'bin', 'sdkgen.js');
const checkMode = process.argv.includes('--check');
const TARGETS = [
  {
    surface: 'app',
    family: 'sdkwork-shop-app-sdk',
    authority: 'sdkwork-shop-app-api',
    source: 'apis/app-api/shop/shop-app-api.openapi.json',
    packageName: 'sdkwork-shop-app-sdk-generated-typescript',
  },
  {
    surface: 'backend',
    family: 'sdkwork-shop-backend-sdk',
    authority: 'sdkwork-shop-backend-api',
    source: 'apis/backend-api/shop/shop-backend-api.openapi.json',
    packageName: 'sdkwork-shop-backend-sdk-generated-typescript',
  },
];

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function collectOperations(openapi) {
  return Object.entries(openapi.paths ?? {}).flatMap(([operationPath, pathItem]) =>
    Object.entries(pathItem ?? {})
      .filter(([method]) => HTTP_METHODS.has(method))
      .map(([method, operation]) => ({ method, operation, operationPath })),
  );
}

function validate(openapi, target) {
  if (openapi.openapi !== '3.1.2') throw new Error(`${target.authority} must use OpenAPI 3.1.2`);
  if (openapi.info?.['x-sdkwork-api-authority'] !== target.authority) {
    throw new Error(`${target.authority} authority mismatch`);
  }
  const apiPrefix = `/${target.surface === 'app' ? 'app' : 'backend'}/v3/api`;
  const operations = collectOperations(openapi);
  for (const { method, operation, operationPath } of operations) {
    const label = operation.operationId ?? `${method} ${operationPath}`;
    if (!operationPath.startsWith(apiPrefix)) throw new Error(`${label} has invalid API prefix`);
    if (operation['x-sdkwork-owner'] !== SDK_OWNER) throw new Error(`${label} owner mismatch`);
    if (operation['x-sdkwork-api-authority'] !== target.authority) {
      throw new Error(`${label} authority mismatch`);
    }
    if (!String(operation['x-sdkwork-permission'] ?? '').trim()) {
      throw new Error(`${label} is missing x-sdkwork-permission`);
    }
  }
  return { apiPrefix, operationCount: operations.length };
}

function synchronize(targetPath, content) {
  const current = existsSync(targetPath) ? readFileSync(targetPath, 'utf8') : '';
  if (checkMode && current !== content) {
    throw new Error(`${path.relative(workspaceRoot, targetPath)} is not synchronized`);
  }
  if (!checkMode && current !== content) {
    mkdirSync(path.dirname(targetPath), { recursive: true });
    writeFileSync(targetPath, content, 'utf8');
  }
}

function generateTarget(target) {
  const familyRoot = path.join(workspaceRoot, 'sdks', target.family);
  const openapi = JSON.parse(readFileSync(path.join(workspaceRoot, target.source), 'utf8'));
  const { apiPrefix, operationCount } = validate(openapi, target);
  const content = stableJson(openapi);
  const authorityPath = path.join(familyRoot, 'openapi', `${target.authority}.openapi.json`);
  const sdkgenPath = path.join(familyRoot, 'openapi', `${target.authority}.sdkgen.json`);
  const generatedRoot = path.join(
    familyRoot,
    `${target.family}-typescript`,
    'generated',
    'server-openapi',
  );
  synchronize(authorityPath, content);
  synchronize(sdkgenPath, content);

  if (!checkMode) {
    const result = spawnSync('node', [
      generatorBin,
      'generate',
      '--input', sdkgenPath,
      '--output', generatedRoot,
      '--name', target.family,
      '--type', target.surface,
      '--language', 'typescript',
      '--base-url', 'http://127.0.0.1:8080',
      '--api-prefix', apiPrefix,
      '--fixed-sdk-version', '0.1.0',
      '--sdk-root', familyRoot,
      '--sdk-name', target.family,
      '--package-name', target.packageName,
      '--standard-profile', 'sdkwork-v3',
    ], { cwd: familyRoot, stdio: 'inherit' });
    if (result.status !== 0) throw new Error(`${target.family} sdkgen failed with exit code ${result.status}`);
  }

  const manifestPath = path.join(familyRoot, 'sdk-manifest.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  manifest.ownerOnlyOperationCount = operationCount;
  manifest.languages[0].generationState = existsSync(path.join(generatedRoot, 'src', 'index.ts'))
    ? 'generated'
    : 'pending';
  if (checkMode && manifest.languages[0].generationState !== 'generated') {
    throw new Error(`${target.family} TypeScript SDK is not generated`);
  }
  if (!checkMode) writeFileSync(manifestPath, stableJson(manifest), 'utf8');
  return `${target.family}:${operationCount}`;
}

try {
  const results = TARGETS.map(generateTarget);
  process.stdout.write(`[shop_sdk_generate] ${checkMode ? 'check passed' : 'generation completed'} (${results.join(', ')})\n`);
} catch (error) {
  process.stderr.write(`[shop_sdk_generate] ${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
}
