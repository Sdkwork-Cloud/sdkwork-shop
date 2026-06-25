# Shop PRD

Status: active
Owner: SDKWork maintainers
Application: shop
Updated: 2026-06-24
Specs: REQUIREMENTS_SPEC.md, DOCUMENTATION_SPEC.md

## Document Map

- Platform split alignment (commerce T0): `../sdkwork-commerce/docs/architecture/tech/TECH-2026-06-24-commerce-capability-repo-split-alignment.md`

## 1. Background And Problem

Merchants need an authoritative shop profile, deposit account, and onboarding lifecycle isolated from the commerce platform composition layer.

This repository is a **T1 commerce capability building block**. `sdkwork-commerce` remains the T0 composition layer (gateway, IAM wrappers, composed SDK). This repository owns domain logic, persistence, and HTTP route builders for the **shop** capability.

## 2. Target Users

Merchant operators, commerce platform integrators, and SDK consumers building shop admin or storefront experiences.

## 3. Goals And Non-Goals

### Goals

- Own shop domain service, SQL repositories, and HTTP routers for app and backend surfaces.
- Expose stable Rust crates consumed by `sdkwork-commerce` through sibling path dependencies.
- Support merchant onboarding, shop metadata, and deposit account review flows with tenant-scoped data.

### Non-Goals

- IAM login, session issuance, or gateway routing (owned by appbase / commerce T0).
- Duplicating shop domain logic inside `sdkwork-commerce/crates/`.
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
- Commerce T0 composes shop app routes with IAM identity middleware while route handlers execute in this repository.
- An integrator consumes generated commerce SDK shop operations against the composed gateway surface.

## 6. Success Metrics

- Shop API operations remain available through composed commerce OpenAPI and SDK smoke tests.
- `cargo test --workspace` passes with zero local shop service duplicates in commerce.
- Database migrations validate through `pnpm db:validate`.

## 7. Phases

- Phase 1 (complete): domain service, SQL, and HTTP routers owned in this repository.
- Phase 2 (complete): shop/catalog adapter boundaries aligned with merchandise and catalog split.

## 8. Linked Requirements

- Commerce capability split alignment: `../sdkwork-commerce/docs/architecture/tech/TECH-2026-06-24-commerce-capability-repo-split-alignment.md`
- Component contract: `specs/component.spec.json` (when present)
- Machine contracts: local `specs/`, future `apis/`, and generated `sdks/`

## 9. Open Questions

- Whether shop PC app ships from this repo or a dedicated app root before production launch.
