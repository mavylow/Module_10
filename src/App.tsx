import "./App.css";
import AuthProvider from "./AuthProvider";
// import SignIn from "./pages/auth/SingIn";
// import ToggleThemeButton from "./components/ToggleTheme";

import Home from "./pages/Home";
import ThemeProvider from "./ThemeProvider";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        {/* <ToggleThemeButton /> */}
        <Home />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
