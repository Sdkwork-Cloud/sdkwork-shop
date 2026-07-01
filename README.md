# sdkwork-shop
repository-kind: application

SDKWork commerce **shop** capability building-block repository (domain `commerce`, capability `shop`).

- Standards: `../sdkwork-specs/README.md`
- Domain service: `crates/sdkwork-shop-service/`
- Repository SQL: `crates/sdkwork-shop-repository-sqlx/`
- PC app: `apps/sdkwork-shop-pc/`
- HTTP API server: `crates/sdkwork-shop-standalone-gateway/`

## Quick start

```bash
pnpm install
pnpm verify
pnpm db:validate
```

## Documentation Canon

- [docs/README.md](docs/README.md)
- [docs/product/prd/PRD.md](docs/product/prd/PRD.md)
- [docs/architecture/tech/TECH_ARCHITECTURE.md](docs/architecture/tech/TECH_ARCHITECTURE.md)

## Application Roots

- [apps directory index](apps/README.md)
