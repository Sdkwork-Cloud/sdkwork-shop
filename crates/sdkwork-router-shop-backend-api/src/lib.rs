pub mod backend_routes;
pub mod http_route_manifest;
pub mod routes;
pub mod subject;
pub mod web_bootstrap;

pub use backend_routes::{
    backend_shop_admin_router_with_postgres_pool, backend_shop_admin_router_with_sqlite_pool,
};
pub use routes::build_shop_backend_router_with_framework;
