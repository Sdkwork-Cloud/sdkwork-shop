use axum::Router;
use sdkwork_database_sqlx::DatabasePool;
use sdkwork_shop_service_host::ShopServiceHost;
use std::sync::Arc;

use crate::{
    app_shop_router_with_postgres_pool, app_shop_router_with_sqlite_pool,
};
use crate::web_bootstrap::wrap_router_with_web_framework_from_env;

pub fn build_shop_app_router(host: Arc<ShopServiceHost>) -> Router {
    match host.database_pool() {
        DatabasePool::Postgres(pool, _) => app_shop_router_with_postgres_pool(pool.clone()),
        DatabasePool::Sqlite(pool, _) => app_shop_router_with_sqlite_pool(pool.clone()),
    }
}

pub async fn build_shop_app_router_with_framework(host: Arc<ShopServiceHost>) -> Router {
    wrap_router_with_web_framework_from_env(build_shop_app_router(host)).await
}
