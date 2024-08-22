import { Navigate } from "react-router-dom";
import { FC, ReactNode } from "react";
import { useAuth } from "../store";

interface IProps {
  component: ReactNode;
  redirectTo: string;
}

export const PrivateRoute: FC<IProps> = ({
  component: Component,
  redirectTo = "/login",
}) => {
  const { isLogin } = useAuth((state) => ({
    isLogin: state.isLogin,
  }));

  return !isLogin ? <Navigate to={redirectTo} /> : Component;
};
