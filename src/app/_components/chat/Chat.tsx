import { Fragment, RefObject, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { CHATS_TAKE, CHAT_INTERSECT_REF_OPTIONS } from '@/constants/constants';
import useChatsQuery from '@/hooks/useChatsQuery';
import useIntersect from '@/hooks/useIntersect';
import { CloseSVG, ResetSVG } from '@/icons/svg';
import { getChats } from '@/lib/apis/chatApi';
import {
  formatKorean12HourTime,
  formatKoreanFullDate,
} from '@/utils/dateTimeUtils';
import Spinner from '@/components/Spinner/Spinner';
import { ChatRoom } from '@/types/chat';

interface ChatProps {
  selectChatRoom: ChatRoom;
  sendChatPreview: {
    message: string;
    error: boolean;
  } | null;
  opponentType: 'lecturerId' | 'userId';
  newChatRef: RefObject<HTMLDivElement>;
  resendMessage: () => void;
  cancelMessage: () => void;
  chatScrollToBottom: () => void;
}

const Chat = ({
  selectChatRoom,
  sendChatPreview,
  opponentType,
  newChatRef,
  resendMessage,
  cancelMessage,
  chatScrollToBottom,
}: ChatProps) => {
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

  useEffect(() => {
    chatScrollToBottom();
  }, [sendChatPreview]);

  useEffect(() => {
    chatScrollToBottom();
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      toast.error('채팅 불러오기에 실패 했습니다.');
    }
  }, [isError]);

  const { ref: lastPrevChatRef } = useIntersect(
    loadPrevChatHandler,
    CHAT_INTERSECT_REF_OPTIONS,
  );

  const isDifferentDay = (
    previousDateString: Date,
    currentDateString: Date,
  ) => {
    const previousDate = new Date(previousDateString);
    const currentDate = new Date(currentDateString);

    const isDifferent =
      previousDate.getDate() !== currentDate.getDate() ||
      previousDate.getMonth() !== currentDate.getMonth() ||
      previousDate.getFullYear() !== currentDate.getFullYear();

    return isDifferent;
  };

  const cancelMessageHandler = () => {
    if (confirm('해당 메시지 전송을 취소 하시겠습니까?')) {
      cancelMessage();
    }
  };

  return (
    <div className="h-0 w-full flex-grow overflow-auto overflow-x-hidden bg-gray-900 ">
      {isLoading && <ChatLoading count={12} />}
      {isFetchingNextPage && <ChatLoading count={6} />}
      {chats.map(({ id, content, createdAt, receiver }, index) => {
        const isReceiver = !receiver[opponentType];
        const beforeChat = chats[index - 1]?.createdAt;
        const isFirstChat = isDifferentDay(beforeChat, createdAt);

        return (
          <Fragment key={id}>
            {((!beforeChat && !hasNextPage) || (beforeChat && isFirstChat)) && (
              <div className="my-3 flex w-full items-center gap-3 text-sm">
                <hr className="flex-grow border-gray-500" />
                {formatKoreanFullDate(createdAt)}
                <hr className="flex-grow border-gray-500" />
              </div>
            )}
            <div
              className={`flex w-fit max-w-[84%] items-end gap-2 py-2 ${
                isReceiver ? '' : 'ml-auto flex-row-reverse'
              }`}
              ref={
                hasNextPage && index === 0
                  ? lastPrevChatRef
                  : index === chats.length - 1
                  ? newChatRef
                  : undefined
              }
            >
              <div
                className={`w-fit rounded-t-lg px-4 py-2 ${
                  isReceiver
                    ? 'ml-2 rounded-r-lg bg-main-color-transparent'
                    : 'mr-2 rounded-l-lg bg-white'
                }`}
              >
                {content}
              </div>
              <div className="whitespace-nowrap text-sm text-gray-300">
                {formatKorean12HourTime(createdAt)}
              </div>
            </div>
          </Fragment>
        );
      })}
      {sendChatPreview && (
        <div className="my-2 ml-auto flex w-fit max-w-[84%] items-end gap-2">
          {sendChatPreview.error ? (
            <div className="mb-1 flex">
              <button
                onClick={resendMessage}
                className="rounded-l-md border-r border-solid border-black/[.20] bg-main-color hover:bg-main-color-transparent"
              >
                <ResetSVG className="mx-[5px] my-[6.5px] size-[14px] fill-white" />
              </button>
              <button
                onClick={cancelMessageHandler}
                className="rounded-r-md bg-main-color hover:bg-main-color-transparent"
              >
                <CloseSVG className="mx-1 my-[5px] size-[17px] stroke-white stroke-[3px]" />
              </button>
            </div>
          ) : (
            <Spinner color="gray-700" size={4} />
          )}
          <div className="w-fit rounded-l-lg rounded-t-lg bg-white px-4 py-2">
            {sendChatPreview.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

const ChatLoading = ({ count }: { count: number }) => {
  const lastElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastElementRef.current) {
      lastElementRef.current.scrollIntoView({ behavior: 'instant' });
    }
  }, [count]);

  return (
    <div className="flex flex-col gap-4 py-5">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            ref={index === count - 1 ? lastElementRef : null}
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
