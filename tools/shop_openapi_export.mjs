#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { loadAuthority, stableJson } from './shop_openapi_authority.mjs';

const checkMode = process.argv.includes('--check');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const targets = [
  {
    sources: ['apis/app-api/shop/shop-app-api.openapi.json'],
    target: 'sdks/sdkwork-shop-app-sdk/openapi/sdkwork-shop-app-api.openapi.json',
  },
  {
    sources: [
      'apis/backend-api/shop/shop-backend-api.openapi.json',
      '../sdkwork-merchandise/apis/backend-api/merchandise/shop-backend-api.merchandise.openapi.json',
    ],
    target: 'sdks/sdkwork-shop-backend-sdk/openapi/sdkwork-shop-backend-api.openapi.json',
  },
];

for (const target of targets) {
  const content = stableJson(loadAuthority(root, target.sources));
  const targetPath = path.join(root, target.target);
  const current = existsSync(targetPath) ? readFileSync(targetPath, 'utf8') : '';
  if (checkMode && current !== content) throw new Error(`${target.target} is not synchronized`);
  if (!checkMode && current !== content) {
    mkdirSync(path.dirname(targetPath), { recursive: true });
    writeFileSync(targetPath, content, 'utf8');
  }
}

process.stdout.write(
  `[shop_openapi_export] ${checkMode ? 'check passed' : 'materialized'} (${targets.length} authorities)\n`,
);
