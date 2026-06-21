import { buildShopDraft, describeShop } from "@sdkwork/shop-pc-core";

const demoShop = buildShopDraft({ name: "示例店铺", slug: "" });

export function ShopAppShell() {
  const headline = describeShop({
    id: "demo",
    name: demoShop.name,
    slug: demoShop.slug,
    status: "draft",
  });

  return (
    <main className="shop-shell">
      <section className="shop-card">
        <h1>SDKWork Shop</h1>
        <p>{headline}</p>
        <p>Merchant shop console scaffold aligned with sdkwork-specs.</p>
      </section>
    </main>
  );
}
