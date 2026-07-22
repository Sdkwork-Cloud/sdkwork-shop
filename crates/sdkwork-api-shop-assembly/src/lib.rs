//! API assembly for sdkwork-shop.
//! Application bootstrap lives in `bootstrap.rs`; route inventory is in `assembly-manifest.json`.

mod bootstrap;
mod generated;

pub use bootstrap::{assemble_api_router, ApiAssembly};

pub async fn assemble_api_router_from_env() -> Result<ApiAssembly, String> {
    let host = sdkwork_shop_service_host::ShopServiceHost::from_env().await?;
    let shop = assemble_api_router(std::sync::Arc::new(host)).await;
    let merchandise = sdkwork_api_merchandise_assembly::assemble_api_router_from_env().await?;
    Ok(ApiAssembly {
        router: shop.router.merge(merchandise.router),
    })
}

pub fn assembly_route_count() -> usize {
    generated::ROUTE_CRATE_COUNT
}
