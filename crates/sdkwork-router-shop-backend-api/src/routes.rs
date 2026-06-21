use axum::routing::get;
use axum::Router;
use sdkwork_shop_service_host::ShopServiceHost;
use std::sync::Arc;

use crate::handlers;
use crate::web_bootstrap::wrap_router_with_web_framework_from_env;

#[derive(Clone)]
pub struct ShopBackendState {
    pub host: Arc<ShopServiceHost>,
}

pub fn build_shop_backend_router(host: Arc<ShopServiceHost>) -> Router {
    let state = ShopBackendState { host };
    Router::new()
        .route("/backend/v3/api/shops", get(handlers::list_shops_admin))
        .with_state(state)
}

pub async fn build_shop_backend_router_with_framework(host: Arc<ShopServiceHost>) -> Router {
    wrap_router_with_web_framework_from_env(build_shop_backend_router(host)).await
}
