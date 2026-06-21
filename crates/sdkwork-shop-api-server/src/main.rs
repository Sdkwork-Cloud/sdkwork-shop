use axum::Router;
use sdkwork_router_shop_app_api::build_shop_app_router_with_framework;
use sdkwork_router_shop_backend_api::build_shop_backend_router_with_framework;
use sdkwork_shop_api_server::shop_health_router;
use sdkwork_shop_service_host::ShopServiceHost;
use std::sync::Arc;
use tower_http::cors::CorsLayer;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    tracing::info!("Starting SDKWork Shop API Server...");

    let host = Arc::new(ShopServiceHost::new().await);
    let app_router = build_shop_app_router_with_framework(host.clone()).await;
    let backend_router = build_shop_backend_router_with_framework(host).await;

    let app = Router::new()
        .merge(shop_health_router())
        .merge(app_router)
        .merge(backend_router)
        .layer(CorsLayer::permissive());

    let addr = std::env::var("SHOP_API_BIND").unwrap_or_else(|_| "0.0.0.0:18090".to_owned());
    tracing::info!("Shop API server listening on {addr}");
    let listener = tokio::net::TcpListener::bind(&addr)
        .await
        .expect("bind shop server");
    axum::serve(listener, app).await.expect("serve shop server");
}
