import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { IUser, IChat, IMessage } from "./types";
import { currentUser, login, register } from "./services/chatApi";
import { getChats, getCurrentChat, getMessages } from "./services/chatApi";

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
    ),
    { name: "token" }
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
          set(() => ({ currentUser: data.user, isLogin: true }));
        } catch (error) {
          console.error(error);
        }
      },
      login: async (user) => {
        try {
          const data = await login(user);
          const tokenState = useToken.getState();
          tokenState.setTokenState(data.token);
          set(() => ({ currentUser: data.user, isLogin: true }));
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
          set(() => ({ currentUser: data.user, isLogin: true }));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    { name: "auth" }
  )
);

interface ChatState {
  chats: IChat[] | null;
  currentChat: IChat | null;
  getChats: () => void;
  getCurrentChat: (id: string, avatar: string) => void;
}

export const useChat = create<ChatState>()(
  devtools(
    (set) => ({
      chats: null,
      currentChat: null,
      getChats: async () => {
        try {
          const data = await getChats();
          set(() => ({ chats: data }));
        } catch (error) {
          console.error(error);
        }
      },
      getCurrentChat: async (id: string, avatar: string) => {
        try {
          const data = await getCurrentChat(id);
          set(() => ({ currentChat: { ...data, avatar } }));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    { name: "chat" }
  )
);

interface MessageState {
  messages: IMessage[];
  getMessages: (chatId: string) => void;
  addMessage: (text: string, author: string, chatId: string) => void;
}

export const useMessage = create<MessageState>()(
  devtools(
    (set) => ({
      messages: [],
      getMessages: async (chatId: string) => {
        try {
          const data = await getMessages(chatId);
          set(() => ({ messages: data }));
        } catch (error) {
          console.error(error);
        }
      },
      addMessage: async (text: string, author: string, chatId: string) => {
        try {
          // const data = await addMessage(text, chatId);
          set((state) => ({
            messages: [
              ...state.messages,
              { text, author, chatId, createdAt: Date().toString() },
            ],
          }));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    { name: "message" }
  )
);
