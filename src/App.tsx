import "@/App.css";
import AuthProvider from "@/AuthProvider";
// import SignIn from "@pages/auth/SignIn";
// import Home from "@/pages/Home";
import ThemeProvider from "@/ThemeProvider";
import ErrorBoundary from "./components/ ErrorBoundary";

import SignUp from "./pages/auth/SignUp";
import { BrowserRouter, Route, Routes } from "react-router";
import SignIn from "./pages/auth/SignIn";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <ThemeProvider>
            <Routes>
              <Route path="/Module_10/signin" element={<SignIn />} />
              <Route path="/Module_10/signup" element={<SignUp />} />
              <Route path="/Module_10/home" element={<Home />} />
            </Routes>
          </ThemeProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
