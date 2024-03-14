import useChatsQuery from '@/hooks/useChatsQuery';
import useIntersect from '@/hooks/useIntersect';
import { getChats } from '@/lib/apis/chatApi';
import { ChatRoomList } from '@/types/chat';

interface ChatProps {
  selectChatRoom: ChatRoomList;
}

const Chat = ({ selectChatRoom }: ChatProps) => {
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

  const loadPrevChatHandler = () => {
    fetchNextPage();
  };

  const { ref } = useIntersect(loadPrevChatHandler);

  return (
    <div className="h-0 w-full flex-grow overflow-auto bg-gray-900">
      {[...chats].reverse().map(({ id, content }, index) => (
        <div key={id + index} ref={hasNextPage ? ref : undefined}>
          {content}
        </div>
      ))}
    </div>
  );
};

export default Chat;
