import "./App.css";
import ToggleThemeButton from "./components/ToggleTheme";
import SignUp from "./pages/auth/SignUp";
import ThemeProvider from "./ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <ToggleThemeButton />
      <SignUp />
    </ThemeProvider>
  );
}

export default App;
