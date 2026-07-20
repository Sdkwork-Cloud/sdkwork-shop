use sdkwork_api_shop_assembly::assemble_api_router;
use sdkwork_shop_service_host::ShopServiceHost;
use sdkwork_web_bootstrap::{service_router, ServiceRouterConfig};
use std::sync::Arc;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    tracing::info!("Starting SDKWork Shop API Server...");

    let host = Arc::new(ShopServiceHost::new().await);
    let business = assemble_api_router(host)
        .await
        .router
        .layer(sdkwork_web_bootstrap::application_cors_layer_from_env(
            &["SDKWORK_SHOP_ENVIRONMENT"],
            &["SDKWORK_SHOP_CORS_ALLOWED_ORIGINS", "SDKWORK_CORS_ALLOWED_ORIGINS"],
        ));
    let app = service_router(business, ServiceRouterConfig::default().with_always_ready());

    let addr = std::env::var("SHOP_API_BIND").unwrap_or_else(|_| "0.0.0.0:18090".to_owned());
    tracing::info!("Shop API server listening on {addr}");
    let listener = tokio::net::TcpListener::bind(&addr)
        .await
        .expect("bind shop server");
    axum::serve(listener, app).await.expect("serve shop server");
}
