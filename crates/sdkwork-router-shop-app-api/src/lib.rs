pub mod handlers;
pub mod http_route_manifest;
pub mod paths;
pub mod routes;
pub mod web_bootstrap;

pub use http_route_manifest::app_route_manifest;
pub use routes::{build_shop_app_router, build_shop_app_router_with_framework};
pub use web_bootstrap::{
    shop_app_api_public_path_prefixes, wrap_router_with_web_framework,
    wrap_router_with_web_framework_from_env,
};
