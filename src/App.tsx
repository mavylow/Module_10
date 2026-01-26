import "@/App.css";
import AuthProvider from "@/AuthProvider";
// import SignIn from "@pages/auth/SignIn";
import Home from "@/pages/Home";
import ThemeProvider from "@/ThemeProvider";

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
