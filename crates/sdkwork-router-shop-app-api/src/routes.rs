use axum::routing::{get, post};
use axum::Router;
use sdkwork_shop_service_host::ShopServiceHost;
use std::sync::Arc;

use crate::handlers;
use crate::web_bootstrap::wrap_router_with_web_framework_from_env;

#[derive(Clone)]
pub struct ShopAppState {
    pub host: Arc<ShopServiceHost>,
}

pub fn build_shop_app_router(host: Arc<ShopServiceHost>) -> Router {
    let state = ShopAppState { host };
    Router::new()
        .route("/app/v3/api/shops/me", get(handlers::retrieve_my_shop))
        .route("/app/v3/api/shops", post(handlers::create_shop))
        .with_state(state)
}

pub async fn build_shop_app_router_with_framework(host: Arc<ShopServiceHost>) -> Router {
    wrap_router_with_web_framework_from_env(build_shop_app_router(host)).await
}
