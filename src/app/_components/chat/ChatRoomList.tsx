import { useQuery } from '@tanstack/react-query';
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
  const opponentType = userType === 'user' ? 'lecturerId' : 'userId';

  return (
    <section>
      <ul className="flex h-full flex-col overflow-y-scroll px-4 sm:w-72 sm:px-0 sm:pr-0">
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
                <ChatRoomInfo chatRoom={chatRoom} opponentType={opponentType} />
              </li>
            </button>
          );
        })}
      </ul>
    </section>
  );
};

export default ChatRoomList;

interface ChatRoomInfoProps {
  chatRoom: ChatRoom;
  opponentType: 'lecturerId' | 'userId';
}

const ChatRoomInfo = ({ chatRoom, opponentType }: ChatRoomInfoProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['opponentProfile', opponentType, chatRoom[opponentType]],
    queryFn: () => getOpponentInfo(opponentType, chatRoom[opponentType]),
  });

  const { lastChat, unreadCount } = chatRoom;

  const { createdAt, imageUrl, content } = lastChat;
  return (
    <>
      {isLoading ? (
        <div className="mr-3 size-[34px] flex-shrink-0 animate-pulse rounded-full bg-gray-700" />
      ) : (
        <ProfileImg src={data?.profilImg} size="small" />
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
          <span className="text-gray-300">
            {formatKorean12HourTime(createdAt)}
          </span>
        </div>
        <div className="grid grid-cols-[1fr_auto] items-center gap-x-2">
          <span className="line-clamp-2 max-h-10 text-left text-gray-300">
            {imageUrl ? '이미지' : content}
          </span>
          {unreadCount && (
            <span className="flex max-h-[24px] min-w-[24px] items-center justify-center rounded-full bg-main-color text-white">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
