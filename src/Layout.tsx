import Header from "@components/Header";
import Footer from "@components/Footer";
import { Outlet } from "react-router";
import ContextProvider from "@providers/ContextProvider";

function Layout() {
  return (
    <ContextProvider>
      <Header />
      <Outlet />
      <Footer />
    </ContextProvider>
  );
}

export default Layout;
