import { useContext } from "react";
import { ThemeContext } from "@/ThemeProvider";
import "./style.css";

function ToggleThemeButton() {
  const { changeTheme, theme } = useContext(ThemeContext);
  return (
    <div className="theme">
      <input onClick={changeTheme} type="checkbox" className="toggle-theme" />
      <span> {theme.slice(0, 1).toUpperCase() + theme.slice(1)} theme</span>
    </div>
  );
}

export default ToggleThemeButton;
