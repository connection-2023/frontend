import { useQuery } from '@tanstack/react-query';
import { MotionValue, motion } from 'framer-motion';
import { getOpponentInfo } from '@/lib/apis/chatApi';
import ChatRoomHeader from './ChatRoomHeader';
import ChatRoomMain from './ChatRoomMain';
import { userType } from '@/types/auth';
import { ChatRoom } from '@/types/chat';

interface ChatRoomProps {
  selectChatRoom: ChatRoom;
  userType: userType;
  mWidth: MotionValue<number> | null;
}

const ChatRoom = ({ mWidth, selectChatRoom, userType }: ChatRoomProps) => {
  const opponentType = userType === 'user' ? 'lecturerId' : 'userId';

  const opponentProfile = useQuery({
    queryKey: ['opponentProfile', opponentType, selectChatRoom[opponentType]],
    queryFn: () => getOpponentInfo(opponentType, selectChatRoom[opponentType]),
    staleTime: Infinity,
  });

  return (
    <motion.section
      className="grid h-full grid-rows-[auto_1fr]"
      style={{ width: mWidth ? mWidth : '100%' }}
    >
      <ChatRoomHeader
        selectChatRoom={selectChatRoom}
        opponentType={opponentType}
        opponentProfile={opponentProfile}
      />
      <ChatRoomMain
        selectChatRoom={selectChatRoom}
        userType={userType}
        opponentProfile={opponentProfile}
      />
    </motion.section>
  );
};

export default ChatRoom;
