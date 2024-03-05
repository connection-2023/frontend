'use client';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useSocketStore, useUserStore } from '@/store';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT ?? '';

const SocketInitializer = () => {
  const { authUser } = useUserStore((state) => ({
    authUser: state.authUser,
  }));

  const { socket, isConnected, setSocket, setIsConnected } = useSocketStore(
    (state) => ({
      socket: state.socket,
      isConnected: state.isConnected,
      setSocket: state.setSocket,
      setIsConnected: state.setIsConnected,
    }),
  );

  useEffect(() => {
    if (authUser && !isConnected) {
      const socket = io(END_POINT);

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

      return () => {
        socket.disconnect();
      };
    } else {
      if (isConnected) {
        socket?.disconnect();
      }
    }
  }, [authUser]);

  return null;
};

export default SocketInitializer;
