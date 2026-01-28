import "@/App.css";
import AuthProvider from "@/AuthProvider";
// import SignIn from "@pages/auth/SignIn";
// import Home from "@/pages/Home";
import ThemeProvider from "@/ThemeProvider";
import ErrorBoundary from "./components/ ErrorBoundary";

import SignUp from "./pages/auth/SignUp";
import { HashRouter, Route, Routes } from "react-router";
import SignIn from "./pages/auth/SignIn";
import Home from "./pages/Home";

function App() {
  return (
    <HashRouter>
      <ErrorBoundary>
        <AuthProvider>
          <ThemeProvider>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </ThemeProvider>
        </AuthProvider>
      </ErrorBoundary>
    </HashRouter>
  );
}

export default App;
