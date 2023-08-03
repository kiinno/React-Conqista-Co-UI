import { createBrowserRouter, redirect, useNavigate } from "react-router-dom";
import Layout from "./pages/www/Layout";
import { default as AuthLayout } from "./pages/auth/Layout.jsx";
import Home from "./pages/www/Home";
import Store from "./pages/www/Store";
import Download from "./pages/www/Download";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Profile from "./pages/www/Profile";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyResetCode from "./pages/auth/VerifyResetCode";
import ResetPassword from "./pages/auth/ResetPassword";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "download", element: <Download /> },
      { path: "store", element: <Store /> },
      { path: "account/profile", element: <Profile /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: () => {
          return redirect("/");
        },
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgot_password", element: <ForgotPassword /> },
      { path: "verify_reset_code", element: <VerifyResetCode /> },
      { path: "reset_password", element: <ResetPassword /> },
    ],
  },
]);
