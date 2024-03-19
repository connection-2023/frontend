import { useQuery } from '@tanstack/react-query';
import { getOpponentInfo } from '@/lib/apis/chatApi';
import { userType } from '@/types/auth';
import { ChatRoom } from '@/types/chat';

interface ChatLsitProps {
  chatSelectHandler: (chatRoom: ChatRoom | null) => void;
  chatRoomList: ChatRoom[];
  userType: userType;
}

const ChatRoomList = ({
  chatSelectHandler,
  chatRoomList,
  userType,
}: ChatLsitProps) => {
  const opponentType = userType === 'user' ? 'lecturerId' : 'userId';

  return (
    <section>
      <ul className="flex h-full flex-col overflow-y-scroll px-4 sm:w-72 sm:px-0 sm:pr-0">
        {chatRoomList.map((chatRoom) => {
          return (
            <li key={chatRoom.id}>
              <button
                onClick={() => chatSelectHandler(chatRoom)}
                className="h-52 w-full flex-shrink-0 bg-slate-400"
              >
                <ChatRoomInfo chatRoom={chatRoom} opponentType={opponentType} />
              </button>
            </li>
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
    queryKey: ['chatRoomInfo', opponentType, chatRoom[opponentType]],
    queryFn: () => getOpponentInfo(opponentType, chatRoom[opponentType]),
  });

  console.log(data);

  return <div />;
};
