'use client';
import { motion, useDragControls } from 'framer-motion';
import { useRef } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import Chat from './Chat';

const ChatContainer = () => {
  const isSm = useMediaQuery('(min-width: 640px)');
  const chatPositionControls = useDragControls();
  const constraintsRef = useRef(null);

  const StartChatPositionDrag = (event: React.PointerEvent<HTMLElement>) => {
    chatPositionControls.start(event);
  };

  return (
    <motion.article
      ref={constraintsRef}
      layoutId="chat"
      className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto flex h-screen max-h-screen w-screen items-center justify-center"
    >
      <motion.main
        drag={isSm}
        dragListener={false}
        dragControls={chatPositionControls}
        dragConstraints={constraintsRef}
        className="pointer-events-auto z-modal bg-white shadow-[0px_0px_4px_1px_rgba(0,0,0,0.25)] sm:rounded-md"
        dragMomentum={false}
      >
        <div
          className="p-2"
          onPointerDown={() => {
            console.log('hi');
          }}
        >
          <Chat StartChatPositionDrag={StartChatPositionDrag} />
        </div>
      </motion.main>
    </motion.article>
  );
};

export default ChatContainer;
