import { useContext } from "react";
import { ThemeContext } from "../../ThemeProvider";
import "./style.css";

function ToggleThemeButton() {
  const { changeTheme } = useContext(ThemeContext);
  return (
    <button onClick={changeTheme} className="toggle-theme">
      Theme Change
    </button>
  );
}

export default ToggleThemeButton;
