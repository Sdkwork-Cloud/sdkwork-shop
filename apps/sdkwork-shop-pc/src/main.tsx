import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ShopAppShell } from "@sdkwork/shop-pc-shell";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ShopAppShell />
  </StrictMode>,
);
