import { MotionValue, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

interface ChatProps {
  dragState: {
    point: null | 'x' | 'y';
    isDragging: boolean;
  };
  mWidth: MotionValue<number> | null;
  mHeight: MotionValue<number> | null;
  StartChatPositionDrag: (event: React.PointerEvent<HTMLElement>) => void;
}

const Chat = ({
  StartChatPositionDrag,
  mWidth,
  mHeight,
  dragState,
}: ChatProps) => {
  const [chatSelect, setchatSelect] = useState<number | null>(null);
  const isSm = mWidth === null || mHeight === null;

  useEffect(() => {
    const { isDragging, point } = dragState;

    if (isDragging) {
      document.body.style.cursor = point === 'x' ? 'col-resize' : 'row-resize';
    } else {
      document.body.style.cursor = 'default';
    }
  }, [dragState]);

  const chatSelectHandler = (id: number | null) => {
    setchatSelect(id);
  };

  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      className="h-screen w-screen sm:h-auto sm:w-auto"
    >
      <ChatHeader
        chatSelect={chatSelect}
        chatSelectHandler={chatSelectHandler}
        isSm={isSm}
        StartChatPositionDrag={StartChatPositionDrag}
      />
      <motion.div
        className="sm:flex sm:gap-3"
        style={{ height: isSm ? '100%' : mHeight }}
      >
        {!isSm && <ChatList chatSelectHandler={chatSelectHandler} />}
        {chatSelect && <ChatRoom mWidth={mWidth} />}
        {isSm && !chatSelect && (
          <ChatList chatSelectHandler={chatSelectHandler} />
        )}
      </motion.div>
    </div>
  );
};

export default Chat;
