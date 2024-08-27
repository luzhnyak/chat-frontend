// src/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_APP_BASE_API_URL, {
      auth: {
        token,
      },
    });

    socket.on("connect", () => {
      console.log("Connected to socket");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket is not connected!");
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
