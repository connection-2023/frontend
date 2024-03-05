'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useSocketStore } from '@/store';

const ChatContainer = () => {
  const { chatView } = useSocketStore((state) => ({
    chatView: state.chatView,
  }));

  const constraintsRef = useRef(null);

  if (!chatView) return null;
  return (
    <motion.div
      ref={constraintsRef}
      layoutId="chat"
      className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto flex h-screen max-h-screen w-screen items-center justify-center"
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        className="pointer-events-auto z-modal h-72 w-72 bg-red-400"
        dragMomentum={false}
      />
    </motion.div>
  );
};

export default ChatContainer;
