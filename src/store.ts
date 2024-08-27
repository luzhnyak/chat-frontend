import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { nanoid } from "nanoid";

import { IUser, IChat, IMessage } from "./types";
import { currentUser, login, register } from "./services/chatApi";
import {
  getChats,
  getCurrentChat,
  addChat,
  updateChat,
  deleteChat,
} from "./services/chatApi";
import { getMessages } from "./services/chatApi";

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
  filter: string;
  setFilter: (filter: string) => void;
  getChats: () => void;
  getCurrentChat: (id: string, avatar: string) => void;
  addChat: (name: string, surName: string) => void;
  updateChat: (id: string, name: string, surName: string) => void;
  updateLastMessage: (id: string, text: string) => void;
  deleteChat: (id: string) => void;
}

export const useChat = create<ChatState>()(
  devtools(
    (set) => ({
      chats: null,
      currentChat: null,
      filter: "",
      setFilter: async (filter: string) => {
        try {
          set(() => ({ filter }));
        } catch (error) {
          console.error(error);
        }
      },
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
      addChat: async (name: string, surName: string) => {
        try {
          const data = await addChat(name, surName);
          set((state) => ({
            chats: [...state.chats!, data],
          }));
        } catch (error) {
          console.error(error);
        }
      },
      updateChat: async (id: string, name: string, surName: string) => {
        try {
          const data = await updateChat(id, name, surName);
          set((state) => ({
            chats: [
              ...state.chats!.map((item) => {
                if (item._id === id) {
                  return data;
                }
                return item;
              }),
            ],
          }));
        } catch (error) {
          console.error(error);
        }
      },
      updateLastMessage: async (id: string, lastMessage: string) => {
        try {
          set((state) => ({
            chats: [
              ...state.chats!.map((item) => {
                if (item._id === id) {
                  return { ...item, lastMessage };
                }
                return item;
              }),
            ],
          }));
        } catch (error) {
          console.error(error);
        }
      },
      deleteChat: async (id: string) => {
        try {
          await deleteChat(id);
          set((state) => ({
            chats: [...state.chats!.filter((item) => item._id !== id)],
          }));
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
          const chatState = useChat.getState();
          chatState.updateLastMessage(chatId, text);
          // const data = await addMessage(text, chatId);
          set((state) => ({
            messages: [
              ...state.messages,
              {
                _id: nanoid(),
                text,
                author,
                chatId,
                createdAt: Date().toString(),
              },
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
