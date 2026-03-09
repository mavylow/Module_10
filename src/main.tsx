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
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { SetContextLink } from "@apollo/client/link/context";

async function enableMocking() {
  await startMockingSocial();
}

const queryClient = new QueryClient();

const httpLink = new HttpLink({
  uri: "/api/graphql",
});

const authLink = new SetContextLink(({ headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Global />
            <App />
          </Provider>
        </QueryClientProvider>
      </ApolloProvider>
    </StrictMode>
  );
});
