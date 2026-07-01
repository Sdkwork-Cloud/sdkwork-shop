use axum::response::{IntoResponse, Response};
use axum::Json;
use sdkwork_contract_service::CommerceServiceError;
use sdkwork_utils_rust::http_api::{
    PageInfo, PageMode, SdkWorkApiResponse, SdkWorkCommandData, SdkWorkPageData,
    SdkWorkResourceData,
};
use sdkwork_web_core::{
    problem_response, ProblemCorrelation, WebFrameworkError, WebFrameworkErrorKind,
};
use serde::Serialize;
use serde_json::{json, Value};

pub fn resolve_trace_id() -> String {
    uuid::Uuid::new_v4().to_string()
}

pub fn success_item<T: Serialize>(trace_id: impl Into<String>, item: T) -> Json<Value> {
    Json(
        serde_json::to_value(SdkWorkApiResponse::success(
            SdkWorkResourceData { item },
            trace_id,
        ))
        .unwrap_or_else(|_| json!({ "code": 0, "data": { "item": null }, "traceId": "" })),
    )
}

pub fn success_offset_page<T: Serialize>(
    trace_id: impl Into<String>,
    items: Vec<T>,
    page: u32,
    page_size: u32,
    total: u64,
) -> Json<Value> {
    let total_pages = if page_size == 0 {
        0
    } else {
        total.div_ceil(page_size as u64) as i32
    };
    Json(
        serde_json::to_value(SdkWorkApiResponse::success(
            SdkWorkPageData {
                items,
                page_info: PageInfo {
                    mode: PageMode::Offset,
                    page: Some(page as i32),
                    page_size: Some(page_size as i32),
                    total_items: Some(total.to_string()),
                    total_pages: Some(total_pages),
                    next_cursor: None,
                    has_more: Some((page as u64 * page_size as u64) < total),
                },
            },
            trace_id,
        ))
        .unwrap_or_else(|_| {
            json!({ "code": 0, "data": { "items": [], "pageInfo": { "mode": "offset" } }, "traceId": "" })
        }),
    )
}

pub fn success_command(trace_id: impl Into<String>) -> Json<Value> {
    Json(
        serde_json::to_value(SdkWorkApiResponse::success(
            SdkWorkCommandData::accepted(),
            trace_id,
        ))
        .unwrap_or_else(|_| json!({ "code": 0, "data": { "accepted": true }, "traceId": "" })),
    )
}

pub fn success_resource<T: Serialize>(item: T) -> Response {
    success_item(resolve_trace_id(), item).into_response()
}

pub fn success_list<T: Serialize>(items: Vec<T>) -> Response {
    let item_count = items.len();
    success_offset_page(
        resolve_trace_id(),
        items,
        1,
        item_count.max(1) as u32,
        item_count as u64,
    )
    .into_response()
}

pub fn success_paged_list<T: Serialize>(
    items: Vec<T>,
    page: u32,
    page_size: u32,
    total: u64,
) -> Response {
    success_offset_page(resolve_trace_id(), items, page, page_size, total).into_response()
}

pub fn success_accepted() -> Response {
    success_command(resolve_trace_id()).into_response()
}

fn problem_for(kind: WebFrameworkErrorKind, message: impl Into<String>) -> Response {
    let trace_id = resolve_trace_id();
    problem_response(
        &WebFrameworkError {
            kind,
            message: message.into(),
            retry_after_seconds: None,
        },
        ProblemCorrelation::from(Some(trace_id.as_str())),
    )
}

pub fn unauthorized_response(message: impl Into<String>) -> Response {
    problem_for(WebFrameworkErrorKind::MissingCredentials, message)
}

pub fn validation_response(message: impl Into<String>) -> Response {
    problem_for(WebFrameworkErrorKind::BadRequest, message)
}

pub fn not_found_response(message: impl Into<String>) -> Response {
    problem_for(WebFrameworkErrorKind::NotFound, message)
}

pub fn conflict_response(message: impl Into<String>) -> Response {
    problem_for(WebFrameworkErrorKind::Conflict, message)
}

pub fn shop_system_response(context: &str, error: CommerceServiceError) -> Response {
    match error.code() {
        "validation" => validation_response(error.message()),
        "not_found" => not_found_response(error.message()),
        "conflict" => conflict_response(error.message()),
        "unauthenticated" => unauthorized_response(error.message()),
        _ => problem_for(
            WebFrameworkErrorKind::DependencyUnavailable,
            format!("{context}: {}", error.message()),
        ),
    }
}
