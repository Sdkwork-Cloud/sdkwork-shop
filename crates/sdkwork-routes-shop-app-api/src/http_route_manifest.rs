use sdkwork_web_core::{HttpMethod, HttpRoute, HttpRouteManifest};

const HTTP_ROUTES: &[HttpRoute] = &[
    HttpRoute::dual_token(
        HttpMethod::Get,
        "/app/v3/api/shops/me",
        "shop",
        "shop.shops.me.retrieve",
    ),
    HttpRoute::dual_token(
        HttpMethod::Post,
        "/app/v3/api/shops",
        "shop",
        "shop.shops.create",
    ),
];

pub fn app_route_manifest() -> HttpRouteManifest {
    HttpRouteManifest::new(HTTP_ROUTES)
}
