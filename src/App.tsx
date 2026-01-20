import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "day");
  }, []);
  return <Home />;
}

export default App;
