# SDKWork Shop PC

Merchant shop console aligned with `APP_PC_ARCHITECTURE_SPEC.md`.

## Verification

```bash
pnpm --dir apps/sdkwork-shop-pc run typecheck
pnpm --dir apps/sdkwork-shop-pc run build
```

Consume shop APIs through generated SDKs — no raw HTTP in feature packages.
