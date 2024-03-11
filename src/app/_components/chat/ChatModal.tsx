'use client';

import { useSocketStore, useUserStore } from '@/store';
import ChatContainer from './ChatContainer';

const ChatModal = () => {
  const { isConnected } = useSocketStore((state) => ({
    isConnected: state.isConnected,
  }));

  const { authUser, userType } = useUserStore((state) => ({
    authUser: state.authUser,
    userType: state.userType,
  }));

  const { chatView } = useSocketStore((state) => ({
    chatView: state.chatView,
  }));

  if (!chatView || !authUser || !userType || !isConnected) return null;

  return <ChatContainer id={authUser.id} />;
};

export default ChatModal;
