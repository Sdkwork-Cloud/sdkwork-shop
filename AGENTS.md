# Repository Guidelines

## SDKWORK Soul

Read `../sdkwork-specs/SOUL.md` before executing tasks in this root.

## SDKWORK Standards

- `../sdkwork-specs/README.md`
- `../sdkwork-specs/SOUL.md`
- `../sdkwork-specs/AGENTS_SPEC.md`
- `../sdkwork-specs/WEB_FRAMEWORK_SPEC.md`
- `../sdkwork-specs/DATABASE_FRAMEWORK_SPEC.md`

## Application Identity

Application manifests live under `apps/*/sdkwork.app.config.json`. This repository root is the commerce shop capability workspace (`domain: commerce`, `capability: shop`).

## Project Rules

- Canonical domain: `commerce`; capability: `shop` (`DOMAIN_SPEC.md`).
- This repository is the **authoritative owner** of shop capability: service, repository SQL, backend admin routes, app shop routes, APIs, SDKs, and database lifecycle under `database/`.
- App shop routes are owned in `sdkwork-routes-shop-app-api`; commerce T0 applies IAM wrappers only.
- Composition consumer: `../sdkwork-clawrouter/vendor/sdkwork-commerce` (archived transitional platform snapshot)
- Database table prefix: `commerce_` for shop-owned tables.
- App API prefix: `/app/v3/api/shops`.
- Backend API prefix: `/backend/v3/api/shops`.
- Rust HTTP runtimes integrate `sdkwork-web-framework`; database lifecycle uses `sdkwork-database`.
- TypeScript packages consume `@sdkwork/utils-typescript` for shared helpers — no local duplicates.
- `sdkwork-discovery` is deferred until RPC/cloud-split deployment exists.
- Generated SDK output under `sdks/**/generated/**` is generator-owned.

## Verification

```bash
pnpm verify
pnpm db:validate
```

## Documentation Canon

- [docs/README.md](docs/README.md)
- [docs/product/prd/PRD.md](docs/product/prd/PRD.md)
- [docs/architecture/tech/TECH_ARCHITECTURE.md](docs/architecture/tech/TECH_ARCHITECTURE.md)

