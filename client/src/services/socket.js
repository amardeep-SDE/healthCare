// src/services/socket.js
import { io } from "socket.io-client";

const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL || rawApiUrl.replace(/\/api\/?$/, "");

export const socket = io(SOCKET_SERVER_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ["websocket", "polling"],
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
