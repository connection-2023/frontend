import { MotionValue, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useChatStore } from '@/store';
import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

interface ChatProps {
  id: string;
  dragState: {
    point: null | 'x' | 'y';
    isDragging: boolean;
  };
  mWidth: MotionValue<number> | null;
  mHeight: MotionValue<number> | null;
  StartChatPositionDrag: (event: React.PointerEvent<HTMLElement>) => void;
}

const Chat = ({
  id,
  mWidth,
  mHeight,
  dragState,
  StartChatPositionDrag,
}: ChatProps) => {
  const { selectChatRoom, setChatRoomSelect } = useChatStore((state) => ({
    selectChatRoom: state.selectChatRoom,
    setChatRoomSelect: state.setChatRoomSelect,
  }));
  const isSm = mWidth === null || mHeight === null;

  useEffect(() => {
    const { isDragging, point } = dragState;

    if (isDragging) {
      document.body.style.cursor = point === 'x' ? 'col-resize' : 'row-resize';
    } else {
      document.body.style.cursor = 'default';
    }
  }, [dragState]);

  const chatSelectHandler = (id: any | null) => {
    setChatRoomSelect(id);
  };

  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      className="h-screen w-screen sm:h-auto sm:w-auto"
    >
      <ChatHeader
        selectChatRoom={selectChatRoom}
        chatSelectHandler={chatSelectHandler}
        isSm={isSm}
        StartChatPositionDrag={StartChatPositionDrag}
      />
      <motion.div
        className="sm:flex sm:gap-3"
        style={{ height: isSm ? '100%' : mHeight }}
      >
        {!isSm && <ChatList id={id} chatSelectHandler={chatSelectHandler} />}
        {selectChatRoom && <ChatRoom mWidth={mWidth} />}
        {isSm && !selectChatRoom && (
          <ChatList id={id} chatSelectHandler={chatSelectHandler} />
        )}
      </motion.div>
    </div>
  );
};

export default Chat;
