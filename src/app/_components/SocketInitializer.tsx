'use client';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useSocketStore } from '@/store';
import { userType } from '@/types/auth';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT ?? '';

interface SocketInitializerProps {
  userType: userType | null;
  rooms: string[] | null;
  userId?: string;
}

const SocketInitializer = ({
  userType,
  rooms,
  userId,
}: SocketInitializerProps) => {
  const { socket, isConnected, setSocket, setIsConnected, setOnlineList } =
    useSocketStore((state) => ({
      socket: state.socket,
      isConnected: state.isConnected,
      setSocket: state.setSocket,
      setIsConnected: state.setIsConnected,
      setOnlineList: state.setOnlineList,
    }));

  useEffect(() => {
    if (userType && userId && !isConnected) {
      const socket = io(`${END_POINT}/chatroom1`);

      socket.on('connect', () => {
        setIsConnected(true);
        setSocket(socket);
        console.log('socket 연결');
      });

      socket.on('disconnect', () => {
        setIsConnected(false);
        setSocket(null);
        console.log('socket 해제');
      });

      socket.on('joinUser', () => {
        setOnlineList({ type: userType, id: userId });
      });

      socket.on('exitUser', () => {
        setOnlineList({ type: userType, id: userId, join: false });
      });

      socket.emit('login', {
        rooms,
        authorizedData:
          userType === 'user' ? { userId } : { lecturerId: userId },
      });

      return () => {
        socket.disconnect();
      };
    } else if (!userType && socket) {
      socket.disconnect();
    }
  }, [userType]);

  return null;
};

export default SocketInitializer;
