import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { startMockingSocial } from "@sidekick-monorepo/internship-backend";
import App from "./App";

async function enableMocking() {
  await startMockingSocial("");
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
