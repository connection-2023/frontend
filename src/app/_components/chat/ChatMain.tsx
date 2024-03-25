import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MotionValue, motion } from 'framer-motion';
import React, { Fragment, useEffect, useState } from 'react';
import { getChatRoomList, readChat } from '@/lib/apis/chatApi';
import { useChatStore } from '@/store';
import ChatHeader from './ChatHeader';
import ChatRoom from './ChatRoom';
import ChatRoomList from './ChatRoomList';
import { userType } from '@/types/auth';
import { ChatRoom as IChatRoom } from '@/types/chat';

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

  const queryClient = useQueryClient();

  const { mutate: readChatFn } = useMutation({
    mutationFn: (chatRoom: IChatRoom) => readChat(chatRoom),
    onSuccess: (selectChatRoom) => {
      queryClient.setQueryData<number>(['commentCount'], (totalCount) => {
        return totalCount && selectChatRoom.unreadCount
          ? selectChatRoom.unreadCount === 0
            ? totalCount - 1
            : totalCount - selectChatRoom.unreadCount < 0
            ? 0
            : totalCount - selectChatRoom.unreadCount
          : totalCount;
      });

      queryClient.setQueryData<ChatRoom[]>(
        [
          'chatRoomList',
          selectChatRoom[userType === 'user' ? 'userId' : 'lecturerId'],
        ],
        (oldData) => {
          if (!oldData) return oldData;

          const targetChatRoomIndex = oldData.findIndex(
            (chatRoom) => chatRoom.id === selectChatRoom.id,
          );

          const targetChatRoom = oldData[targetChatRoomIndex];
          const updatedChatRoom = {
            ...targetChatRoom,
            unreadCount: undefined,
          };

          const updatedData = [...oldData];
          updatedData.splice(targetChatRoomIndex, 1);
          updatedData.unshift(updatedChatRoom);

          return updatedData;
        },
      );
    },
  });

  useEffect(() => {
    const { isDragging, point } = dragState;

    if (isDragging) {
      document.body.style.cursor = point === 'x' ? 'col-resize' : 'row-resize';
    } else {
      document.body.style.cursor = 'default';
    }
  }, [dragState]);

  const { data: chatRoomListData, isLoading } = useQuery({
    queryKey: ['chatRoomList', id],
    queryFn: () => getChatRoomList(id),
    staleTime: Infinity,
    refetchOnWindowFocus: 'always',
  });

  const chatSelectHandler = (chatRoom: IChatRoom | null) => {
    setChatRoomSelect(chatRoom ? { ...chatRoom, unreadCount: 0 } : null);
    if (chatRoom) readChatFn(chatRoom);
  };

  const [chatRoomList, setChatRoomList] = useState<IChatRoom[]>([]);

  useEffect(() => {
    setChatRoomList(chatRoomListData ?? []);
  }, [chatRoomListData]);

  const searchChatRoomList = (searchValue?: string) => {
    setChatRoomList((prev) =>
      searchValue
        ? prev.filter(
            ({ nickname, lastChat }) =>
              lastChat?.content
                ?.toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              nickname?.toLowerCase().includes(searchValue.toLowerCase()),
          )
        : chatRoomListData ?? [],
    );
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
        searchChatRoomList={searchChatRoomList}
      />
      <motion.div
        className="overflow-hidden sm:flex "
        style={{ height: isSm ? '100%' : mHeight }}
      >
        {(!isSm || !selectChatRoom) &&
          (isLoading ? (
            <ChatRoomListLoading />
          ) : (
            <ChatRoomList
              chatRoomList={chatRoomList}
              chatSelectHandler={chatSelectHandler}
              userType={userType}
              selectChatRoomId={selectChatRoom?.id}
            />
          ))}
        {selectChatRoom && (
          <ChatRoom
            mWidth={mWidth}
            selectChatRoom={selectChatRoom}
            userType={userType}
            readChatFn={readChatFn}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ChatMain;

const ChatRoomListLoading = () => {
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
