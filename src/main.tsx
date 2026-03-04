import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { startMockingSocial } from "@sidekick-monorepo/internship-backend";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./i18n";
import { createGlobalStyle } from "styled-components";

async function enableMocking() {
  await startMockingSocial();
}

const queryClient = new QueryClient();

const Global = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
}
`;
enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Global />
          <App />
        </Provider>
      </QueryClientProvider>
    </StrictMode>
  );
});
