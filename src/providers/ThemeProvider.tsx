import { createContext, useEffect, useState, type ReactNode } from "react";

export type ThemeType = "light" | "dark";

interface ThemeProviderProps {
  children: ReactNode;
}

interface IThemeContext {
  theme: ThemeType;
  changeTheme: () => void;
  resetTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: "dark",
  changeTheme: () => {},
  resetTheme: () => {},
});

function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>("dark");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) {
      return;
    }

    const storageTheme = localStorage.getItem("theme");

    if (storageTheme === "light" || storageTheme === "dark") {
      setTheme(storageTheme);
    } else {
      localStorage.setItem("theme", "dark");
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme, isInitialized]);

  const changeTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const resetTheme = () => {
    setTheme("dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
