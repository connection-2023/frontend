import { useQueries, useQuery } from '@tanstack/react-query';
import { MotionValue, motion } from 'framer-motion';
import { getChat, getCheckOnlineList } from '@/lib/apis/chatApi';
import { useSocketStore } from '@/store';
import ChatRoomHeader from './ChatRoomHeader';
import ChatRoomMain from './ChatRoomMain';
import { userType } from '@/types/auth';
import { ChatRoomList } from '@/types/chat';

interface ChatRoomProps {
  selectChatRoom: ChatRoomList;
  userType: userType;
  mWidth: MotionValue<number> | null;
}

const ChatRoom = ({ mWidth, selectChatRoom, userType }: ChatRoomProps) => {
  const { onlineList, setOnlineList } = useSocketStore((state) => ({
    onlineList: state.onlineList,
    setOnlineList: state.setOnlineList,
  }));

  const opponentType = userType === 'user' ? 'lecturerId' : 'userId';

  const { isLoading: headerIsLoading, error: headerError } = useQuery({
    queryKey: ['onlineList', selectChatRoom.id],
    queryFn: async () => {
      const onlineState = await getCheckOnlineList(selectChatRoom.id);

      if (onlineState[opponentType]) {
        setOnlineList({
          type: userType === 'user' ? 'lecturer' : 'user',
          id: onlineState[opponentType]!,
        });
      }

      return '';
    },
    refetchOnWindowFocus: 'always',
  });

  const isOnline = onlineList[opponentType].includes(
    selectChatRoom[opponentType],
  );

  return (
    <motion.section
      className="flex flex-col"
      style={{ width: mWidth ? mWidth : '100%' }}
    >
      {headerIsLoading ? (
        <div>로딩</div>
      ) : (
        !headerError && <ChatRoomHeader isOnline={isOnline} />
      )}
      <ChatRoomMain />
    </motion.section>
  );
};

export default ChatRoom;
