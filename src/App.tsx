import "@/App.css";
import AuthProvider from "@/AuthProvider";
// import SignIn from "@pages/auth/SignIn";
// import Home from "@/pages/Home";
import ThemeProvider from "@/ThemeProvider";
import ErrorBoundary from "./components/ ErrorBoundary";
import SignIn from "./pages/auth/SignIn";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <SignIn />
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
