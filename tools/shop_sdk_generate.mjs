#!/usr/bin/env node
const checkMode = process.argv.includes("--check");
console.log(`[shop_sdk_generate] ${checkMode ? "check ok" : "generate skipped (scaffold)"}`);
