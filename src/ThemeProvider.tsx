import { createContext, useEffect, useState, type ReactNode } from "react";

export type ThemeType = "day" | "night";

interface ThemeProviderProps {
  children: ReactNode;
}

interface IThemeContext {
  theme: ThemeType;
  changeTheme: () => void;
  resetTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: "night",
  changeTheme: () => {},
  resetTheme: () => {},
});

function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>("night");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) return;

    const storageTheme = localStorage.getItem("theme");

    if (storageTheme === "day" || storageTheme === "night") {
      setTheme(storageTheme);
    } else {
      localStorage.setItem("theme", "night");
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme, isInitialized]);

  const changeTheme = () => {
    setTheme((prev) => (prev === "day" ? "night" : "day"));
  };

  const resetTheme = () => {
    setTheme("night");
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
