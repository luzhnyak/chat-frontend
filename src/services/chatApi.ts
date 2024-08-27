import axios, { AxiosError } from "axios";
import { IUser } from "../types";
import { showError } from "./showError";

axios.defaults.baseURL = `${import.meta.env.VITE_APP_BASE_API_URL}/api`;

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

export const addChat = async (name: string, surName: string) => {
  try {
    const { data } = await axios.post("/chats", { name, surName });
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const updateChat = async (id: string, name: string, surName: string) => {
  try {
    const { data } = await axios.put(`/chats/${id}`, { name, surName });
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const deleteChat = async (id: string) => {
  try {
    const { data } = await axios.delete(`/chats/${id}`);
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const getMessages = async (chatId: string) => {
  try {
    const { data } = await axios.get(`/messages/${chatId}`);
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const addMessage = async (text: string, chatId: string) => {
  try {
    const { data } = await axios.post("/messages", { text, chatId });

    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};
