import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { startMockingSocial } from "@sidekick-monorepo/internship-backend";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

async function enableMocking() {
  await startMockingSocial();
}
const queryClient = new QueryClient();

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </StrictMode>
  );
});
