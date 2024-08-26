import { Navigate, useSearchParams } from "react-router-dom";
import { FC, useEffect } from "react";
import { useToken } from "../store";

interface IProps {
  redirectTo: string;
}

export const AuthPage: FC<IProps> = ({ redirectTo = "/" }) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { setTokenState } = useToken((state) => ({
    setTokenState: state.setTokenState,
  }));

  useEffect(() => {
    setTokenState(token!);
  }, [setTokenState, token]);

  return <Navigate to={redirectTo} />;
};
