import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = (username) => {
  if (socket?.connected) return socket;

  // In production, connect to same origin. In dev, Vite proxy handles it.
  socket = io('/', {
    auth: { username },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10
  });

  socket.on('connect', () => {
    console.log('🔗 Connected to chat server');
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error.message);
  });

  socket.on('disconnect', (reason) => {
    console.log('🔌 Disconnected:', reason);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
