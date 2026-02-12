import "@/App.css";
import SignUp from "@pages/auth/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router";
import SignIn from "@pages/auth/SignIn";
import Home from "@pages/Home";
import Profile from "@/pages/Profile";
import Layout from "@/Layout";
import { loadPosts } from "@utils/apiUtil";
import NotFoundPage from "@pages/NotFoundPage";
import Fallback from "@pages/Fallback";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home />, loader: loadPosts },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        {
          path: "profile",
          element: <Profile />,
        },
        { path: "*", element: <NotFoundPage /> },
      ],
      errorElement: <Fallback />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
