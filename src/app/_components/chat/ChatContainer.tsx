'use client';

import { useSocketStore } from '@/store';

const ChatContainer = () => {
  const { chatView } = useSocketStore((state) => ({
    chatView: state.chatView,
  }));

  if (!chatView) return null;
  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto">
      <div className="pointer-events-auto absolute bottom-auto left-1/2 top-1/2  z-modal h-72 w-72 -translate-x-1/2 -translate-y-1/2 bg-white " />
    </div>
  );
};

export default ChatContainer;
