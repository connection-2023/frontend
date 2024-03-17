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
      {chats.map(({ id, content, createdAt }, index) => {
        return (
          <div
            className="my-2 flex w-fit max-w-[84%] items-end gap-2"
            key={id}
            ref={hasNextPage && index === 0 ? ref : undefined}
          >
            <div className="w-fit bg-main-color-transparent px-4 py-2">
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
