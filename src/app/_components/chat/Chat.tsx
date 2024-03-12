import { useQuery } from '@tanstack/react-query';
import { MotionValue, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getChatRoomList } from '@/lib/apis/chatApi';
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
  const router = useRouter();
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

  const {
    data: chatRoomList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['chat', id],
    queryFn: () => getChatRoomList(userType, id),
    refetchOnWindowFocus: 'always',
  });

  if (chatRoomList instanceof Error || error) {
    toast.error('다시 시도 해 주세요.');
    router.refresh();
    return;
  }

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
        className="sm:flex "
        style={{ height: isSm ? '100%' : mHeight }}
      >
        {(!isSm || !selectChatRoom) &&
          (isLoading ? (
            <div className="flex h-full flex-col overflow-y-scroll px-4 sm:w-72 sm:px-0 sm:pr-0">
              로딩중
            </div>
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

export default Chat;
