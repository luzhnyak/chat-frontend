import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { RestrictedRoute } from "./pages/RestrictedRoute";
import { PrivateRoute } from "./pages/PrivateRoute";
import { SharedLayout } from "./components/SharedLayout";
import { AuthPage } from "./pages/AuthPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      {
        index: true,
        element: <PrivateRoute component={<ChatPage />} redirectTo="/login" />,
      },
      {
        path: "/chat",
        element: <PrivateRoute component={<ChatPage />} redirectTo="/login" />,
      },
      {
        path: "/login",
        element: (
          <RestrictedRoute component={<LoginPage />} redirectTo="/chat" />
        ),
      },
      {
        path: "/register",
        element: (
          <RestrictedRoute component={<RegisterPage />} redirectTo="/chat" />
        ),
      },
      {
        path: "/auth",
        element: <AuthPage redirectTo="/chat" />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
