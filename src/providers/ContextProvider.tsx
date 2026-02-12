import type { ReactNode } from "react";
import ErrorBoundary from "@components/ ErrorBoundary";
import AuthProvider from "@providers/AuthProvider";
import ThemeProvider from "@providers/ThemeProvider";
import PopUpProvider from "@providers/PopupProvider";
import ProfilePageProvider from "./ProfilePageProvider";

interface IContextProvider {
  children: ReactNode;
}
function ContextProvider({ children }: IContextProvider) {
  return (
    <ErrorBoundary>
      <PopUpProvider>
        <ProfilePageProvider>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
        </ProfilePageProvider>
      </PopUpProvider>
    </ErrorBoundary>
  );
}

export default ContextProvider;
