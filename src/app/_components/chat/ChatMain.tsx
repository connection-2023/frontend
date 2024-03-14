import { useQuery } from '@tanstack/react-query';
import { MotionValue, motion } from 'framer-motion';
import React, { Fragment, useEffect } from 'react';
import { getChatRoomList } from '@/lib/apis/chatApi';
import { useChatStore } from '@/store';
import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import { userType } from '@/types/auth';
import { ChatRoomList } from '@/types/chat';

interface ChatMainProps {
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

const ChatMain = ({
  id,
  mWidth,
  mHeight,
  dragState,
  userType,
  StartChatPositionDrag,
}: ChatMainProps) => {
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

  const { data: chatRoomList, isLoading } = useQuery({
    queryKey: ['chat', id],
    queryFn: () => getChatRoomList(userType, id),
    refetchOnWindowFocus: 'always',
  });

  const chatSelectHandler = (chatRoom: ChatRoomList | null) => {
    setChatRoomSelect(chatRoom);
  };

  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      className="grid h-screen w-screen grid-rows-[auto_1fr] sm:block sm:h-auto sm:w-auto"
    >
      <ChatHeader
        selectChatRoom={selectChatRoom}
        chatSelectHandler={chatSelectHandler}
        isSm={isSm}
        StartChatPositionDrag={StartChatPositionDrag}
      />
      <motion.div
        className="overflow-hidden sm:flex"
        style={{ height: isSm ? '100%' : mHeight }}
      >
        {(!isSm || !selectChatRoom) &&
          (isLoading ? (
            <ChatListLoading />
          ) : (
            <ChatList
              id={id}
              chatRoomList={chatRoomList ?? []}
              chatSelectHandler={chatSelectHandler}
            />
          ))}
        {selectChatRoom && (
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

export default ChatMain;

const ChatListLoading = () => {
  return (
    <div className="mt-4 flex h-full flex-col items-center gap-3 px-4 sm:w-72 sm:px-0 sm:pr-0">
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <Fragment key={index}>
            <div className="h-16 w-11/12 animate-pulse rounded-lg bg-gray-700" />
            {index !== 7 && <hr className="w-11/12 animate-pulse border-2" />}
          </Fragment>
        ))}
    </div>
  );
};
