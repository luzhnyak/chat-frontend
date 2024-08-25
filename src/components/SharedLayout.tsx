import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useAuth, useToken } from "../store";
import { setToken } from "../services/chatApi";

import "react-toastify/dist/ReactToastify.css";
// import { Hourglass } from "react-loader-spinner";

export const SharedLayout = () => {
  const { isLogin, currentUser, getCurrentUser } = useAuth((state) => ({
    isLogin: state.isLogin,
    currentUser: state.currentUser,
    getCurrentUser: state.getCurrentUser,
  }));

  const { token } = useToken((state) => ({
    token: state.token,
  }));

  useEffect(() => {
    if (token) {
      setToken(token);
    }
    if (!isLogin && token) {
      getCurrentUser();
    }
  }, [currentUser, getCurrentUser, isLogin, token]);

  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Outlet />
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </>
  );
};
