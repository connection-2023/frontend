import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { NotFoundSVG } from '@/icons/svg';
import { getOpponentInfo } from '@/lib/apis/chatApi';
import { formatKorean12HourTime } from '@/utils/dateTimeUtils';
import ProfileImg from '@/components/Profile/ProfileImage';
import { userType } from '@/types/auth';
import { ChatRoom } from '@/types/chat';

interface ChatLsitProps {
  chatSelectHandler: (chatRoom: ChatRoom | null) => void;
  chatRoomList: ChatRoom[];
  userType: userType;
  selectChatRoomId?: string;
}

const ChatRoomList = ({
  chatSelectHandler,
  chatRoomList,
  userType,
  selectChatRoomId,
}: ChatLsitProps) => {
  const hasChatRoomList = chatRoomList.length > 0;

  return (
    <section>
      <ul
        className={`${
          hasChatRoomList ? 'overflow-y-scroll' : ''
        } flex h-full flex-col px-4 sm:w-72 sm:px-0 sm:pr-0`}
      >
        {chatRoomList.map((chatRoom, index) => {
          return (
            <button
              key={chatRoom.id}
              onClick={() => chatSelectHandler(chatRoom)}
              className={`${
                index === chatRoomList.length - 1 ? '' : 'border-b'
              } ${
                selectChatRoomId === chatRoom.id
                  ? 'bg-main-color-transparent'
                  : ''
              } border-gray-500 py-3 hover:bg-main-color-transparent`}
            >
              <li className="flex h-14 w-full flex-shrink-0 items-center px-2 text-sm">
                <ChatRoomInfo chatRoom={chatRoom} userType={userType} />
              </li>
            </button>
          );
        })}
        {!hasChatRoomList && (
          <div className="mx-auto my-auto flex flex-col items-center gap-6 font-semibold">
            <NotFoundSVG />
            <p>존재하는 채팅방이 없습니다!</p>
          </div>
        )}
      </ul>
    </section>
  );
};

export default ChatRoomList;

interface ChatRoomInfoProps {
  chatRoom: ChatRoom;
  userType: userType;
}

const ChatRoomInfo = ({ chatRoom, userType }: ChatRoomInfoProps) => {
  const queryClient = useQueryClient();
  const opponentType = userType === 'user' ? 'lecturer' : 'user';

  const { data, isLoading } = useQuery({
    queryKey: ['opponentProfile', opponentType, chatRoom[opponentType].id],
    queryFn: () => getOpponentInfo(opponentType, chatRoom[opponentType].id),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      const { nickname, profileImg } = data;

      queryClient.setQueryData<ChatRoom[]>(
        ['chatRoomList', chatRoom[opponentType].id],
        (oldData) => {
          if (!oldData) return oldData;

          return oldData.map((chatRoom) => {
            if (chatRoom[opponentType].id === data.id) {
              return { ...chatRoom, nickname, profileImg };
            } else {
              return { ...chatRoom };
            }
          });
        },
      );
    }
  }, [data]);

  const { lastChat, unreadCount } = chatRoom;

  return (
    <>
      {isLoading ? (
        <div className="mr-3 size-[34px] flex-shrink-0 animate-pulse rounded-full bg-gray-700" />
      ) : (
        <ProfileImg src={data?.profileImg} size="small" />
      )}
      <div className="flex w-full flex-col gap-1">
        <div className="grid grid-cols-[1fr_auto] items-center gap-x-2">
          {isLoading ? (
            <div className="h-3 w-full animate-pulse bg-gray-700" />
          ) : (
            <span className="truncate text-left font-medium">
              {data?.nickname}
            </span>
          )}
          {lastChat && (
            <span className="text-gray-300">
              {formatKorean12HourTime(lastChat.createdAt)}
            </span>
          )}
        </div>
        <div className="grid grid-cols-[1fr_auto] items-center gap-x-2">
          {lastChat && (
            <span className="line-clamp-2 max-h-10 text-left text-gray-300">
              {lastChat.imageUrl ? '이미지' : lastChat.content}
            </span>
          )}
          {typeof unreadCount === 'number' && unreadCount > 0 && (
            <span className="flex max-h-[24px] min-w-[24px] items-center justify-center rounded-full bg-main-color text-white">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
