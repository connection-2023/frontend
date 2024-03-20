import { MotionValue, motion } from 'framer-motion';
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

  return (
    <motion.section
      className="grid h-full grid-rows-[auto_1fr]"
      style={{ width: mWidth ? mWidth : '100%' }}
    >
      <ChatRoomHeader
        selectChatRoom={selectChatRoom}
        opponentType={opponentType}
      />
      <ChatRoomMain selectChatRoom={selectChatRoom} userType={userType} />
    </motion.section>
  );
};

export default ChatRoom;
