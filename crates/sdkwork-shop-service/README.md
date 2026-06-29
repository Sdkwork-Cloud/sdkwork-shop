# sdkwork-shop-service

Domain: commerce
Capability: commerce
Package type: rust-crate
Status: stable

This README is the SDKWork module entrypoint for `sdkwork-shop-service`. The machine-readable component contract is `specs/component.spec.json`; canonical standards are under `../../../sdkwork-specs/`.

## Public API

- `shop_service_contract`
- `ShopScopeQuery`, `ShopDetailQuery`, `ShopListQuery`, `ShopSummaryView`, `ShopPage`

## Verification

- `cargo test --manifest-path crates/sdkwork-shop-service/Cargo.toml`

## Owner And Status

Owner and lifecycle status are tracked in `specs/component.spec.json`. Update that contract before changing public integration behavior.
