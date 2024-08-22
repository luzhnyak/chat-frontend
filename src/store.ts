import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { IUser } from "./types";
import { currentUser, login, register } from "./services/chatApi";

interface TokenState {
  token: string | null;
  setTokenState: (token: string) => void;
}

export const useToken = create<TokenState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        setTokenState: async (token) => {
          set(() => ({ token }));
        },
      }),
      { name: "token" }
    )
  )
);

interface AuthState {
  currentUser: IUser | null;
  isLogin: boolean;

  register: (user: IUser) => void;
  login: (user: IUser) => void;
  logout: () => void;
  getCurrentUser: () => void;
  setIsLogin: (value: boolean) => void;
}

export const useAuth = create<AuthState>()(
  devtools(
    (set) => ({
      currentUser: null,
      isLogin: false,
      setIsLogin: async (value) => {
        set(() => ({ isLogin: value }));
      },
      register: async (user) => {
        try {
          const data = await register(user);
          const tokenState = useToken.getState();
          tokenState.setTokenState(data.token);
          set(() => ({ currentUser: data, isLogin: true }));
        } catch (error) {
          console.error(error);
        }
      },
      login: async (user) => {
        try {
          const data = await login(user);
          const tokenState = useToken.getState();
          tokenState.setTokenState(data.token);
          set(() => ({ currentUser: data, isLogin: true }));
        } catch (error) {
          console.error(error);
        }
      },
      logout: async () => {
        try {
          // await logout();
          const tokenState = useToken.getState();
          tokenState.setTokenState("");
          set(() => ({ currentUser: null, isLogin: false }));
        } catch (error) {
          console.error(error);
        }
      },
      getCurrentUser: async () => {
        try {
          const data = await currentUser();
          set(() => ({ currentUser: data, isLogin: true }));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    { name: "auth" }
  )
);
