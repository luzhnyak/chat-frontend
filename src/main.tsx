import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { RestrictedRoute } from "./pages/RestrictedRoute";
import { PrivateRoute } from "./pages/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    // errorElement: <NotFoundPage />,
    element: <PrivateRoute component={<ChatPage />} redirectTo="/login" />,
  },
  {
    path: "/chat",
    // errorElement: <NotFoundPage />,
    element: <PrivateRoute component={<ChatPage />} redirectTo="/login" />,
  },
  {
    path: "/login",
    // errorElement: <NotFoundPage />,
    element: <RestrictedRoute component={<LoginPage />} redirectTo="/chat" />,
  },
  {
    path: "/register",
    // errorElement: <NotFoundPage />,
    element: (
      <RestrictedRoute component={<RegisterPage />} redirectTo="/chat" />
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
