import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./palette-violet.css";
import { injectFonts } from "./fonts";
import App from "./App";

// Inject self-hosted Geist fonts before React mounts to avoid FOUT
injectFonts();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
