#!/usr/bin/env node
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const checkMode = process.argv.includes("--check");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const pairs = [
  {
    source: "apis/app-api/shop/shop-app-api.openapi.json",
    target: "sdks/sdkwork-shop-app-sdk/openapi/sdkwork-shop-app-api.openapi.json",
  },
];

function normalizeJson(filePath) {
  return `${JSON.stringify(JSON.parse(readFileSync(filePath, "utf8")), null, 2)}\n`;
}

let ok = true;
for (const { source, target } of pairs) {
  const sourcePath = path.join(root, source);
  const targetPath = path.join(root, target);
  if (checkMode) {
    try {
      if (normalizeJson(sourcePath) !== normalizeJson(targetPath)) {
        console.error(`[shop_openapi_export] drift: ${source} != ${target}`);
        ok = false;
      }
    } catch (error) {
      console.error(`[shop_openapi_export] check failed for ${source}: ${error.message}`);
      ok = false;
    }
    continue;
  }
  mkdirSync(path.dirname(targetPath), { recursive: true });
  copyFileSync(sourcePath, targetPath);
  console.log(`[shop_openapi_export] copied ${source} -> ${target}`);
}

if (checkMode) {
  if (!ok) process.exit(1);
  console.log(`[shop_openapi_export] check ok (${pairs.length} authorities)`);
}
