# Shop Technical Architecture

Status: active
Owner: SDKWork maintainers
Updated: 2026-06-29
Specs: ARCHITECTURE_DECISION_SPEC.md, RUST_CODE_SPEC.md, API_SPEC.md, WEB_FRAMEWORK_SPEC.md, DATABASE_FRAMEWORK_SPEC.md

## 1. Architecture Overview

`sdkwork-shop` is a **T1 capability repository** in the commerce domain. It owns domain services, SQL repositories, HTTP route builders, database lifecycle, SDK authorities, and a standalone gateway with IAM middleware.

```text
sdkwork-shop-service          → domain commands/queries
sdkwork-shop-repository-sqlx  → tenant-scoped SQL persistence
sdkwork-routes-shop-*-api     → build_*_router() (no IAM)
sdkwork-shop-standalone-gateway → IAM middleware + gateway assembly
```

## 2. Technology Choices

- **Rust** domain services and SQLx repositories (`RUST_CODE_SPEC.md`)
- **Axum** HTTP routers integrated via `sdkwork-web-framework` (`WEB_FRAMEWORK_SPEC.md`)
- **sdkwork-database** for migrations, seeds, drift, and lifecycle SPI (`DATABASE_FRAMEWORK_SPEC.md`)
- **sdkwork-utils** (`sdkwork-utils-rust`, `@sdkwork/utils`) for shared HTTP envelope helpers and TypeScript utilities
- **Sibling path dependencies** from workspace `Cargo.toml` for web framework, database, IAM, and merchandise catalog routes

## 3. System Boundaries And Modules

| Layer | Owner | Notes |
| --- | --- | --- |
| Domain commands/queries | `sdkwork-shop-service` | Business validation and ports |
| SQL repositories | `sdkwork-shop-repository-sqlx` | Tenant-scoped persistence; table prefix `commerce_` |
| HTTP route builders | `sdkwork-routes-shop-app-api`, `sdkwork-routes-shop-backend-api` | `build_*_router` exports; `SdkWorkApiResponse` via `http_envelope` |
| Database host | `sdkwork-shop-database-host` | Lifecycle bootstrap from env |
| Service host | `sdkwork-shop-service-host` | Wires database + shop service |
| IAM / gateway composition | `sdkwork-shop-standalone-gateway`, `sdkwork-shop-gateway-assembly` | IAM middleware at standalone gateway |
| OpenAPI / SDK authority | `apis/`, `sdks/` | Per-capability SDK families; no raw HTTP in apps |
| PC application root | `apps/sdkwork-shop-pc/` | Merchant console via generated app SDK |

## 4. Directory And Package Layout

Standard capability workspace crates:

- `crates/sdkwork-shop-service/`
- `crates/sdkwork-shop-repository-sqlx/`
- `crates/sdkwork-routes-shop-app-api/`
- `crates/sdkwork-routes-shop-backend-api/`
- `crates/sdkwork-shop-database-host/`
- `crates/sdkwork-shop-service-host/`
- `crates/sdkwork-shop-standalone-gateway/`
- `crates/sdkwork-shop-gateway-assembly/`

Supporting assets: `database/`, `apis/`, `sdks/`, `specs/`, `deployments/`, `apps/sdkwork-shop-pc/`.

## 5. API, SDK, And Data Ownership

- App API prefix: `/app/v3/api/shops`
- Backend API prefix: `/backend/v3/api/shops`
- Success envelope: `SdkWorkApiResponse` with numeric `code: 0`, `data`, and `traceId` (`API_SPEC.md` §15)
- Errors: HTTP 4xx/5xx `application/problem+json` (`ProblemDetail`) with numeric `code` and `traceId`
- Single resource: `data.item`; lists: `data.items` + `data.pageInfo`
- Table prefix: `commerce_` for capability-owned tables
- Media fields use `*MediaResourceId` references; file upload flows go through **sdkwork-drive** (client: drive app SDK; server: Drive Uploader / approved facades per `DRIVE_SPEC.md`)

## 6. Deferred Integrations

- **sdkwork-discovery**: not required until RPC/cloud-split deployment exists (HTTP-only standalone gateway today)
- **sdkwork-drive**: shop stores media resource IDs only; upload UI must integrate drive SDK before launch

## 7. Security, Privacy, And Observability

- Authentication and tenant context are applied at the standalone gateway IAM middleware; handlers read `IamAppContext` from extensions.
- Write routes require idempotency and request-hash headers where applicable (`API_SPEC.md`, `SECURITY_SPEC.md`).
- Structured errors use `ProblemDetail`; do not leak internal SQL details to clients.
- Handlers serialize success through `sdkwork-web-framework` + `sdkwork-utils-rust` envelope helpers.

## 8. Deployment And Runtime Topology

- Local development: `pnpm verify`, `cargo test --workspace`
- Standalone HTTP entry: `sdkwork-shop-standalone-gateway` (`pnpm start`)
- Deployment manifest: `deployments/` per `SDKWORK_DEPLOY_SPEC.md`
- Topology spec: `specs/topology.spec.json`

## 9. Verification

```bash
pnpm verify
pnpm db:validate
node ../sdkwork-specs/tools/check-api-response-envelope.mjs --workspace .
cargo test --workspace
```
