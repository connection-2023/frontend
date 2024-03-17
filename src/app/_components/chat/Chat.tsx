import useChatsQuery from '@/hooks/useChatsQuery';
import useIntersect from '@/hooks/useIntersect';
import { getChats } from '@/lib/apis/chatApi';
import { ChatRoomList } from '@/types/chat';

interface ChatProps {
  selectChatRoom: ChatRoomList;
  sendChatPreview: {
    message: string;
    error: boolean;
  } | null;
}

const Chat = ({ selectChatRoom, sendChatPreview }: ChatProps) => {
  const getChatsHandler = ({ pageParam: lastItemId }: { pageParam: string }) =>
    getChats({
      chatRoomId: selectChatRoom.id,
      pageSize: 1,
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

  const { ref } = useIntersect(loadPrevChatHandler, options);

  return (
    <div className="h-0 w-full flex-grow overflow-auto bg-gray-900">
      {chats.map(({ id, content }, index) => (
        <div key={id} ref={hasNextPage && index === 0 ? ref : undefined}>
          {content}
        </div>
      ))}
      {sendChatPreview && <div>{sendChatPreview.message}</div>}
    </div>
  );
};

export default Chat;
