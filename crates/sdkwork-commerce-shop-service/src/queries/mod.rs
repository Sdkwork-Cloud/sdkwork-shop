use sdkwork_commerce_contract_service::CommerceServiceError;

#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ShopScopeQuery {
    pub tenant_id: String,
    pub organization_id: Option<String>,
}

#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ShopDetailQuery {
    pub tenant_id: String,
    pub organization_id: Option<String>,
    pub shop_id: String,
}

#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ShopListQuery {
    pub tenant_id: String,
    pub organization_id: Option<String>,
    pub page: u32,
    pub page_size: u32,
}

#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ShopSummaryView {
    pub shop_id: String,
    pub tenant_id: String,
    pub organization_id: String,
    pub shop_no: String,
    pub shop_name: String,
    pub shop_type: String,
    pub business_model: String,
    pub storefront_status: String,
    pub operation_status: String,
    pub review_status: String,
    pub data_scope: String,
    pub logo_media_resource_id: Option<String>,
    pub cover_media_resource_id: Option<String>,
    pub default_currency_code: String,
    pub default_locale: Option<String>,
    pub timezone: Option<String>,
    pub version: i64,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ShopPage<T> {
    pub items: Vec<T>,
    pub page: u32,
    pub page_size: u32,
    pub total: u64,
}

impl ShopScopeQuery {
    pub fn new(
        tenant_id: &str,
        organization_id: Option<&str>,
    ) -> Result<Self, CommerceServiceError> {
        crate::validation::require_non_empty("tenant_id", tenant_id)?;
        Ok(Self {
            tenant_id: tenant_id.trim().to_string(),
            organization_id: optional_text(organization_id),
        })
    }
}

impl ShopDetailQuery {
    pub fn new(
        tenant_id: &str,
        organization_id: Option<&str>,
        shop_id: &str,
    ) -> Result<Self, CommerceServiceError> {
        crate::validation::require_non_empty("tenant_id", tenant_id)?;
        crate::validation::require_non_empty("shop_id", shop_id)?;
        Ok(Self {
            tenant_id: tenant_id.trim().to_string(),
            organization_id: optional_text(organization_id),
            shop_id: shop_id.trim().to_string(),
        })
    }
}

impl ShopListQuery {
    pub fn new(
        tenant_id: &str,
        organization_id: Option<&str>,
        page: u32,
        page_size: u32,
    ) -> Result<Self, CommerceServiceError> {
        crate::validation::require_non_empty("tenant_id", tenant_id)?;
        Ok(Self {
            tenant_id: tenant_id.trim().to_string(),
            organization_id: optional_text(organization_id),
            page: page.max(1),
            page_size: page_size.clamp(1, 200),
        })
    }
}

fn optional_text(value: Option<&str>) -> Option<String> {
    value
        .map(str::trim)
        .filter(|value| !value.is_empty())
        .map(str::to_owned)
}
