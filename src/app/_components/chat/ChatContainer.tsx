'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useSocketStore } from '@/store';
import ChatHeader from './ChatHeader';

const ChatContainer = () => {
  const { chatView } = useSocketStore((state) => ({
    chatView: state.chatView,
  }));

  const constraintsRef = useRef(null);

  if (!chatView) return null;
  return (
    <motion.article
      ref={constraintsRef}
      layoutId="chat"
      className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto flex h-screen max-h-screen w-screen items-center justify-center"
    >
      <motion.main
        drag
        dragConstraints={constraintsRef}
        className="pointer-events-auto z-modal h-[633px] w-[19rem] rounded-md bg-white pl-5 pr-3 pt-4 shadow-[0px_0px_4px_1px_rgba(0,0,0,0.25)]"
        dragMomentum={false}
      >
        <ChatHeader />
      </motion.main>
    </motion.article>
  );
};

export default ChatContainer;
