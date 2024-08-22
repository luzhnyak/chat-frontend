import axios from "axios";
import { IUser } from "../types";
// import { showError } from "./showError";

axios.defaults.baseURL = "http://localhost:5000/api";

export const setToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const login = async ({ email, password }: IUser) => {
  const { data } = await axios.post("/auth/login", { email, password });

  setToken(data.token);
  return data;
};

export const register = async ({ name, email, password }: IUser) => {
  const { data } = await axios.post("/auth/register", {
    name,
    email,
    password,
  });

  setToken(data.token);
  return data;
};

export const logout = async () => {
  const { data } = await axios.post("/auth/logout");

  clearToken();
  return data;
};

export const currentUser = async () => {
  const { data } = await axios.get("/auth/user");
  return data;
};
