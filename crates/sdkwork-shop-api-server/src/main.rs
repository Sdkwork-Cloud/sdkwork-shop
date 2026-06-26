use sdkwork_shop_gateway_assembly::assemble_application_router;
use sdkwork_shop_service_host::ShopServiceHost;
use sdkwork_web_bootstrap::{service_router, ServiceRouterConfig};
use std::sync::Arc;
use tower_http::cors::CorsLayer;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    tracing::info!("Starting SDKWork Shop API Server...");

    let host = Arc::new(ShopServiceHost::new().await);
    let business = assemble_application_router(host).await.router
        .layer(CorsLayer::permissive());
    let app = service_router(business, ServiceRouterConfig::default().with_always_ready());

    let addr = std::env::var("SHOP_API_BIND").unwrap_or_else(|_| "0.0.0.0:18090".to_owned());
    tracing::info!("Shop API server listening on {addr}");
    let listener = tokio::net::TcpListener::bind(&addr)
        .await
        .expect("bind shop server");
    axum::serve(listener, app).await.expect("serve shop server");
}
