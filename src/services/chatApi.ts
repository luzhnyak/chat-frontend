import axios, { AxiosError } from "axios";
import { IUser } from "../types";
import { showError } from "./showError";
// import { showError } from "./showError";

axios.defaults.baseURL = "http://localhost:5000/api";

export const setToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const login = async ({ email, password }: IUser) => {
  try {
    const { data } = await axios.post("/auth/login", { email, password });

    setToken(data.token);
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const register = async ({ name, email, password }: IUser) => {
  try {
    const { data } = await axios.post("/auth/register", {
      name,
      email,
      password,
    });

    setToken(data.token);
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const logout = async () => {
  try {
    const { data } = await axios.post("/auth/logout");

    clearToken();
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const currentUser = async () => {
  try {
    const { data } = await axios.get("/auth/user");
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const getChats = async () => {
  try {
    const { data } = await axios.get("/chats");
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const getCurrentChat = async (id: string) => {
  try {
    const { data } = await axios.get(`/chats/${id}`);
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};
