import { observer } from "mobx-react-lite";
import { useEffect, useState, type ReactNode } from "react";
import theme from "@/store/themeStore";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = observer(({ children }: ThemeProviderProps) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) {
      return;
    }

    const storageTheme = localStorage.getItem("theme");

    if (storageTheme === "light" || storageTheme === "dark") {
      theme.setTheme(storageTheme);
    } else {
      localStorage.setItem("theme", "dark");
    }

    setIsInitialized(true);
    console.log(theme.value);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    document.documentElement.setAttribute("data-theme", theme.value);
    localStorage.setItem("theme", theme.value);
  }, [theme.value, isInitialized]);

  return <>{children}</>;
});

export default ThemeProvider;
