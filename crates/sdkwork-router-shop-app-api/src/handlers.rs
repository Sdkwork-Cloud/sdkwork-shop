use axum::extract::State;
use axum::http::StatusCode;
use axum::Json;
use sdkwork_commerce_shop_service::CreateShopCommand;
use sdkwork_web_core::WebRequestContext;
use serde::{Deserialize, Serialize};
use serde_json::json;
use uuid::Uuid;

use crate::routes::ShopAppState;

#[derive(Debug, Deserialize)]
pub struct CreateShopBody {
    pub name: String,
    pub slug: String,
}

#[derive(Debug, Serialize)]
pub struct ShopResponse {
    pub id: Uuid,
    pub name: String,
    pub slug: String,
    pub status: String,
}

pub async fn retrieve_my_shop(
    State(state): State<ShopAppState>,
    context: WebRequestContext,
) -> Result<Json<ShopResponse>, (StatusCode, Json<serde_json::Value>)> {
    let tenant_id = parse_uuid(context.tenant_id(), "tenant_id")?;
    let organization_id = parse_uuid(context.organization_id(), "organization_id")?;

    let shop = state
        .host
        .shop_service()
        .retrieve_my_shop(tenant_id, organization_id)
        .await
        .map_err(internal_error)?;

    match shop {
        Some(profile) => Ok(Json(ShopResponse {
            id: profile.id,
            name: profile.name,
            slug: profile.slug,
            status: profile.status,
        })),
        None => Err((
            StatusCode::NOT_FOUND,
            Json(json!({ "code": "shop.not_found", "message": "shop profile not found" })),
        )),
    }
}

pub async fn create_shop(
    State(state): State<ShopAppState>,
    context: WebRequestContext,
    Json(body): Json<CreateShopBody>,
) -> Result<(StatusCode, Json<serde_json::Value>), (StatusCode, Json<serde_json::Value>)> {
    let tenant_id = parse_uuid(context.tenant_id(), "tenant_id")?;
    let organization_id = parse_uuid(context.organization_id(), "organization_id")?;
    let user_id = parse_uuid(context.user_id(), "user_id")?;

    let profile = state
        .host
        .shop_service()
        .create_shop(CreateShopCommand {
            tenant_id,
            organization_id,
            user_id,
            name: body.name,
            slug: body.slug,
        })
        .await
        .map_err(bad_request)?;

    Ok((StatusCode::CREATED, Json(json!({ "id": profile.id }))))
}

fn parse_uuid(
    value: Option<&str>,
    field: &str,
) -> Result<Uuid, (StatusCode, Json<serde_json::Value>)> {
    let raw = value.ok_or_else(|| {
        (
            StatusCode::UNAUTHORIZED,
            Json(json!({
                "code": "request.missing_context",
                "message": format!("missing {field}")
            })),
        )
    })?;
    Uuid::parse_str(raw).map_err(|_| {
        (
            StatusCode::BAD_REQUEST,
            Json(json!({
                "code": "request.invalid_context",
                "message": format!("invalid {field}")
            })),
        )
    })
}

fn internal_error(message: String) -> (StatusCode, Json<serde_json::Value>) {
    (
        StatusCode::INTERNAL_SERVER_ERROR,
        Json(json!({ "code": "shop.internal_error", "message": message })),
    )
}

fn bad_request(message: String) -> (StatusCode, Json<serde_json::Value>) {
    (
        StatusCode::BAD_REQUEST,
        Json(json!({ "code": "shop.bad_request", "message": message })),
    )
}
