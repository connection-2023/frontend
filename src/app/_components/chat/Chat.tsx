import { useEffect, useRef, useState } from 'react';
import { CHATS_TAKE } from '@/constants/constants';
import useChatsQuery from '@/hooks/useChatsQuery';
import useIntersect from '@/hooks/useIntersect';
import { getChats } from '@/lib/apis/chatApi';
import { formatKorean12HourTime } from '@/utils/dateTimeUtils';
import { ChatRoomList } from '@/types/chat';

interface ChatProps {
  selectChatRoom: ChatRoomList;
  sendChatPreview: {
    message: string;
    error: boolean;
  } | null;
  opponentType: 'lecturerId' | 'userId';
}

const Chat = ({ selectChatRoom, sendChatPreview, opponentType }: ChatProps) => {
  const chatRef = useRef<HTMLDivElement>(null);

  const getChatsHandler = ({ pageParam: lastItemId }: { pageParam: string }) =>
    getChats({
      chatRoomId: selectChatRoom.id,
      pageSize: CHATS_TAKE,
      lastItemId,
    });

  const {
    chats,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useChatsQuery({
    chatRoomId: selectChatRoom.id,
    queryFn: getChatsHandler,
  });

  const loadPrevChatHandler = async () => {
    if (isFetchingNextPage) return;
    await fetchNextPage();
  };

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  } as const;

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (!isLoading) scrollToBottom();
  }, [isLoading]);

  const { ref: lastPrevChatRef } = useIntersect(loadPrevChatHandler, options);

  return (
    <div
      ref={chatRef}
      className="h-0 w-full flex-grow overflow-auto bg-gray-900"
    >
      {isLoading && <ChatLoading count={12} />}
      {isFetchingNextPage && <ChatLoading count={6} />}
      {chats.map(({ id, content, createdAt, receiver }, index) => {
        const isReceiver = !receiver[opponentType];

        return (
          <div
            className={`my-2 flex w-fit max-w-[84%] items-end gap-2 ${
              isReceiver ? '' : 'ml-auto flex-row-reverse'
            }`}
            key={id}
            ref={hasNextPage && index === 0 ? lastPrevChatRef : undefined}
          >
            <div
              className={`w-fit rounded-t-lg px-4 py-2 ${
                isReceiver
                  ? 'rounded-r-lg bg-main-color-transparent'
                  : 'rounded-l-lg bg-white'
              }`}
            >
              {content}
            </div>
            <div className="whitespace-nowrap text-sm text-gray-300">
              {formatKorean12HourTime(createdAt)}
            </div>
          </div>
        );
      })}
      {sendChatPreview && <div>{sendChatPreview.message}</div>}
    </div>
  );
};

export default Chat;

const ChatLoading = ({ count }: { count: number }) => {
  return (
    <div className="flex flex-col gap-4 py-5">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 ${
              index % 2 === 1 ? 'flex-row-reverse' : ''
            }`}
          >
            <div className="h-10 w-[84%] animate-pulse bg-gray-700" />
            <div className="h-2 w-7 animate-pulse bg-gray-700" />
          </div>
        ))}
    </div>
  );
};
