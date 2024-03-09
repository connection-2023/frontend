import { MotionValue, motion } from 'framer-motion';
import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

interface ChatProps {
  mWidth: MotionValue<number>;
  mHeight: MotionValue<number>;
  StartChatPositionDrag: (event: React.PointerEvent<HTMLElement>) => void;
}

const Chat = ({ StartChatPositionDrag, mWidth, mHeight }: ChatProps) => {
  const [chatSelect, setchatSelect] = useState<number | null>(null);

  const chatSelectHandler = (id: number) => {
    setchatSelect(id);
  };

  return (
    <div onPointerDown={(e) => e.stopPropagation()}>
      <ChatHeader StartChatPositionDrag={StartChatPositionDrag} />
      <motion.div className="flex gap-3" style={{ height: mHeight }}>
        <ChatList chatSelectHandler={chatSelectHandler} />
        {chatSelect && <ChatRoom mWidth={mWidth} />}
      </motion.div>
    </div>
  );
};

export default Chat;
