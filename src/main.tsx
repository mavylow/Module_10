import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { startMockingSocial } from "@sidekick-monorepo/internship-backend";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";

async function enableMocking() {
  await startMockingSocial();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
});
