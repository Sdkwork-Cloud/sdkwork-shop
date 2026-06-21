use axum::extract::State;
use axum::http::StatusCode;
use axum::Json;
use sdkwork_web_core::WebRequestContext;
use serde_json::json;
use uuid::Uuid;

use crate::routes::ShopBackendState;

pub async fn list_shops_admin(
    State(state): State<ShopBackendState>,
    context: WebRequestContext,
) -> Result<Json<serde_json::Value>, (StatusCode, Json<serde_json::Value>)> {
    let tenant_id = parse_uuid(context.tenant_id(), "tenant_id")?;
    let items = state
        .host
        .shop_service()
        .list_shops_for_admin(tenant_id)
        .await
        .map_err(|message| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "code": "shop.internal_error", "message": message })),
            )
        })?;

    Ok(Json(json!({
        "items": items.into_iter().map(|item| json!({
            "id": item.id,
            "name": item.name,
            "status": item.status
        })).collect::<Vec<_>>()
    })))
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
