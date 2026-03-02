import "@/App.css";
import SignUp from "@pages/auth/SignUp";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import SignIn from "@pages/auth/SignIn";
import Home from "@pages/Home";
import Profile from "@components/Profile";
import Layout from "@/Layout";
import { loadPosts } from "@utils/apiUtil";
import NotFoundPage from "@pages/NotFoundPage";
import Fallback from "@pages/Fallback";
import ProfileInfo from "@pages/ProfileInfo";
import Statistics from "@pages/Statistics";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home />, loader: loadPosts },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        {},
        {
          path: "profile",
          element: <Profile />,
          children: [
            {
              index: true,
              element: <Navigate to="info" replace />,
            },
            { path: "info", element: <ProfileInfo /> },
            { path: "statistics", element: <Statistics /> },
          ],
        },
        { path: "*", element: <NotFoundPage /> },
      ],
      errorElement: <Fallback />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
