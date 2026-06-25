# sdkwork-shop

SDKWork commerce **shop** capability building-block repository (domain `commerce`).

- Standards: `../sdkwork-specs/README.md`
- Composition consumer: `../sdkwork-commerce` (T0 platform)
- Domain service: `crates/sdkwork-commerce-shop-service/`
- Repository SQL: `crates/sdkwork-commerce-shop-repository-sqlx/`
- PC app: `apps/sdkwork-shop-pc/`
- HTTP API server: `crates/sdkwork-shop-api-server/`

## Quick start

```bash
pnpm verify
pnpm db:validate
cargo test --workspace
```

## Documentation Canon

- [docs/README.md](docs/README.md)
- [docs/product/prd/PRD.md](docs/product/prd/PRD.md)
- [docs/architecture/tech/TECH_ARCHITECTURE.md](docs/architecture/tech/TECH_ARCHITECTURE.md)
