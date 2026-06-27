# Shop PRD

Status: active
Owner: SDKWork maintainers
Application: shop
Updated: 2026-06-24
Specs: REQUIREMENTS_SPEC.md, DOCUMENTATION_SPEC.md

## Document Map

- Commerce repository dissolution: `../sdkwork-specs/MIGRATION_SPEC.md` §8

## 1. Background And Problem

Merchants need an authoritative shop profile, deposit account, and onboarding lifecycle isolated from the commerce platform composition layer.

This repository is a **T1 commerce capability building block**. The `sdkwork-commerce` monolith has been dissolved; this repository is self-contained with its own domain logic, persistence, HTTP route builders, API server, and IAM middleware for the **shop** capability.

## 2. Target Users

Merchant operators, commerce platform integrators, and SDK consumers building shop admin or storefront experiences.

## 3. Goals And Non-Goals

### Goals

- Own shop domain service, SQL repositories, and HTTP routers for app and backend surfaces.
- Expose stable Rust crates consumed by sibling T1 repositories through workspace path dependencies.
- Support merchant onboarding, shop metadata, and deposit account review flows with tenant-scoped data.

### Non-Goals

- IAM login, session issuance, or gateway routing (owned by appbase / T1 `*-standalone-gateway`).
- Duplicating shop domain logic inside other T1 repositories.
- End-user mall storefront (see `sdkwork-mall` sibling application).

## 4. Scope

- Shop CRUD and lifecycle for merchant tenants.
- Deposit account onboarding and review.
- Backend admin shop operations.
- Shop-owned SQL migrations and repository contracts.

Primary API prefixes:

- App: `/app/v3/api/shops`
- Backend: `/backend/v3/api/shops`

Migration status: **complete**.

## 5. User Scenarios

- A merchant operator creates a shop, submits deposit account details, and an admin approves the account.
- The T1 `sdkwork-shop-standalone-gateway` applies IAM identity middleware to shop app routes while route handlers execute in this repository.
- An integrator consumes generated per-T1 SDK shop operations against the standalone API server.

## 6. Success Metrics

- Shop API operations remain available through per-T1 OpenAPI and SDK smoke tests.
- `cargo test --workspace` passes with zero local shop service duplicates.
- Database migrations validate through `pnpm db:validate`.

## 7. Phases

- Phase 1 (complete): domain service, SQL, and HTTP routers owned in this repository.
- Phase 2 (complete): shop/catalog adapter boundaries aligned with merchandise and catalog split.

## 8. Linked Requirements

- Commerce repository dissolution: `../sdkwork-specs/MIGRATION_SPEC.md` §8
- Component contract: `specs/component.spec.json` (when present)
- Machine contracts: local `specs/`, future `apis/`, and generated `sdks/`

## 9. Open Questions

- Whether shop PC app ships from this repo or a dedicated app root before production launch.
