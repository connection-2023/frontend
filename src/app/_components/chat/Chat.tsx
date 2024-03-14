import { useEffect, useMemo } from 'react';
import useChatsQuery from '@/hooks/useChatsQuery';
import useIntersect from '@/hooks/useIntersect';
import { getChats } from '@/lib/apis/chatApi';
import { useChatStore } from '@/store';
import { ChatRoomList } from '@/types/chat';

interface ChatProps {
  selectChatRoom: ChatRoomList;
}

const Chat = ({ selectChatRoom }: ChatProps) => {
  const { newChatsList } = useChatStore((state) => ({
    newChatsList: state.newChatsList,
  }));

  const newChats = newChatsList?.[selectChatRoom.id] ?? [];

  const getChatsHandler = ({ pageParam: lastItemId }: { pageParam: string }) =>
    getChats({
      chatRoomId: selectChatRoom.id,
      pageSize: 1,
      lastItemId,
    });

  const {
    chats: prevChats,
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

  const { ref } = useIntersect(loadPrevChatHandler, options);

  return (
    <div className="h-0 w-full flex-grow overflow-auto bg-gray-900">
      {[...prevChats].reverse().map(({ id, content }, index) => (
        <div key={id} ref={hasNextPage && index === 0 ? ref : undefined}>
          {content}
        </div>
      ))}
      {newChats.map(({ id, content }) => (
        <div key={id}>{content}</div>
      ))}
    </div>
  );
};

export default Chat;
