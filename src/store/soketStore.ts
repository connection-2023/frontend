import { Socket } from 'socket.io-client';
import { create } from 'zustand';

interface socketStore {
  socket: Socket | null;
  isConnected: boolean;
  setSocket: (socket: Socket | null) => void;
  setIsConnected: (state: boolean) => void;
}

export const useSocketStore = create<socketStore>((set) => ({
  socket: null,
  isConnected: false,
  setSocket: (socket) => set({ socket }),
  setIsConnected: (state) => set({ isConnected: state }),
}));
