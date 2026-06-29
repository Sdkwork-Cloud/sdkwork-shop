use sdkwork_shop_service::{
    shop_service_contract, ShopDetailQuery, ShopListQuery, ShopScopeQuery,
};

#[test]
fn shop_service_contract_declares_shop_runtime_surface() {
    let contract = shop_service_contract();

    assert_eq!(contract.domain, "shop");
    assert_eq!(contract.service_name, "commerce.shop");
    assert!(contract.read_queries.contains(&"shops.current.retrieve"));
    assert!(contract
        .write_commands
        .contains(&"shops.current.applications.create"));
    assert!(contract.ports.contains(&"shop.repository"));
}

#[test]
fn shop_scope_queries_require_tenant_context() {
    let scope = ShopScopeQuery::new("100001", Some("0")).unwrap();
    assert_eq!(scope.tenant_id, "100001");
    assert_eq!(scope.organization_id.as_deref(), Some("0"));

    let detail = ShopDetailQuery::new("100001", Some("0"), "shop-1").unwrap();
    assert_eq!(detail.shop_id, "shop-1");

    let list = ShopListQuery::new("100001", None, 0, 500).unwrap();
    assert_eq!(list.page, 1);
    assert_eq!(list.page_size, 200);
}
