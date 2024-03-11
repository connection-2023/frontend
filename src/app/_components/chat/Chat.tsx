import { MotionValue, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useChatStore } from '@/store';
import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import { userType } from '@/types/auth';
import { ChatRoomList } from '@/types/chat';

interface ChatProps {
  id: string;
  dragState: {
    point: null | 'x' | 'y';
    isDragging: boolean;
  };
  mWidth: MotionValue<number> | null;
  mHeight: MotionValue<number> | null;
  userType: userType;
  StartChatPositionDrag: (event: React.PointerEvent<HTMLElement>) => void;
}

const Chat = ({
  id,
  mWidth,
  mHeight,
  dragState,
  userType,
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

  const chatSelectHandler = (chatRoom: ChatRoomList | null) => {
    setChatRoomSelect(chatRoom);
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
        {(!isSm || !selectChatRoom) && (
          <ChatList
            id={id}
            userType={userType}
            chatSelectHandler={chatSelectHandler}
          />
        )}
        {selectChatRoom && !isSm && (
          <ChatRoom
            mWidth={mWidth}
            selectChatRoom={selectChatRoom}
            userType={userType}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Chat;
