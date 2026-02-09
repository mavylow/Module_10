import type { ReactNode } from "react";
import ErrorBoundary from "@components/ ErrorBoundary";
import AuthProvider from "@providers/AuthProvider";
import ThemeProvider from "@providers/ThemeProvider";
import PopUpProvider from "@providers/PopupProvider";

interface IContextProvider {
  children: ReactNode;
}
function ContextProvider({ children }: IContextProvider) {
  return (
    <ErrorBoundary>
      <PopUpProvider>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </PopUpProvider>
    </ErrorBoundary>
  );
}

export default ContextProvider;
