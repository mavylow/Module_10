import "./App.css";
// import ToggleThemeButton from "./components/ToggleTheme";

import Home from "./pages/Home";
import ThemeProvider from "./ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      {/* <ToggleThemeButton /> */}
      <Home />
    </ThemeProvider>
  );
}

export default App;
