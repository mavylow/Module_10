import type { ReactNode } from "react";
import ErrorBoundary from "@components/ ErrorBoundary";
import AuthProvider from "@providers/AuthProvider";
import ThemeProvider from "@providers/ThemeProvider";

interface IContextProvider {
  children: ReactNode;
}
function ContextProvider({ children }: IContextProvider) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default ContextProvider;
