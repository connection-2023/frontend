import { Socket } from 'socket.io-client';
import { create } from 'zustand';
import { userType } from '@/types/auth';
import { onlineList } from '@/types/types';

interface socketStore {
  socket: Socket | null;
  isConnected: boolean;
  chatView: boolean;
  onlineList: onlineList;
  setSocket: (socket: Socket | null) => void;
  setIsConnected: (state: boolean) => void;
  setOnlineList: ({
    type,
    id,
    join,
  }: {
    type: userType;
    id: number | string;
    join?: boolean;
  }) => void;
}

export const useSocketStore = create<socketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  chatView: false,
  onlineList: {
    lecturerId: [],
    userId: [],
  },
  setSocket: (socket) => set({ socket }),
  setIsConnected: (state) => set({ isConnected: state }),
  setOnlineList: ({ type, id: targetId, join = true }) => {
    const { onlineList } = get();
    const key = type === 'lecturer' ? 'lecturerId' : 'userId';

    const updatedList = join
      ? [...onlineList[key], targetId]
      : onlineList[key].filter((id) => id !== targetId);

    set({ onlineList: { ...onlineList, [key]: updatedList } });
  },
}));
