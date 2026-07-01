use axum::Router;
use sdkwork_database_sqlx::DatabasePool;
use sdkwork_shop_service_host::ShopServiceHost;
use std::sync::Arc;

use crate::web_bootstrap::wrap_router_with_web_framework_from_env;
use crate::{
    backend_shop_admin_router_with_postgres_pool, backend_shop_admin_router_with_sqlite_pool,
};

pub fn build_shop_backend_router(host: Arc<ShopServiceHost>) -> Router {
    match host.database_pool() {
        DatabasePool::Postgres(pool, _) => {
            backend_shop_admin_router_with_postgres_pool(pool.clone())
        }
        DatabasePool::Sqlite(pool, _) => backend_shop_admin_router_with_sqlite_pool(pool.clone()),
    }
}

pub async fn build_shop_backend_router_with_framework(host: Arc<ShopServiceHost>) -> Router {
    wrap_router_with_web_framework_from_env(build_shop_backend_router(host)).await
}
