import "./App.css";
import AuthProvider from "./AuthProvider";
import Home from "./pages/Home";
import ThemeProvider from "./ThemeProvider";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
