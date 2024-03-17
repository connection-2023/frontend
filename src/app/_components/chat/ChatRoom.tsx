import { useQuery } from '@tanstack/react-query';
import { MotionValue, motion } from 'framer-motion';
import { getCheckOnline } from '@/lib/apis/chatApi';
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
  const senderType = userType === 'user' ? 'lecturerId' : 'userId';

  const {
    data,
    isLoading: headerIsLoading,
    error: headerError,
  } = useQuery({
    queryKey: ['onlineState', senderType, selectChatRoom[senderType]],
    queryFn: () => getCheckOnline(senderType, selectChatRoom[senderType]),
  });

  return (
    <motion.section
      className="grid h-full grid-rows-[auto_1fr]"
      style={{ width: mWidth ? mWidth : '100%' }}
    >
      {headerIsLoading ? (
        <div>로딩</div>
      ) : (
        !headerError && <ChatRoomHeader isOffline={data} />
      )}
      <ChatRoomMain selectChatRoom={selectChatRoom} userType={userType} />
    </motion.section>
  );
};

export default ChatRoom;
