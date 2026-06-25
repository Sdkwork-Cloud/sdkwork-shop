//! Selects the merchant "current shop" for an organization scope.
//!
//! Prefer operational shops (`active`, then `pending_review`, then `draft`) over
//! terminal states (`suspended`, `rejected`, `closed`). Among ties, pick the newest shop.

pub const CURRENT_SHOP_ORDER_BY: &str = r#"
ORDER BY
  CASE operation_status
    WHEN 'active' THEN 0
    WHEN 'pending_review' THEN 1
    WHEN 'draft' THEN 2
    WHEN 'suspended' THEN 3
    WHEN 'rejected' THEN 4
    WHEN 'closed' THEN 5
    ELSE 6
  END ASC,
  created_at DESC,
  id ASC
LIMIT 1
"#;
