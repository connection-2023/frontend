import { useQuery } from '@tanstack/react-query';
import { MotionValue, motion } from 'framer-motion';
import { getCheckOnline } from '@/lib/apis/chatApi';
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
        <ChatRoomHeaderLoading />
      ) : (
        !headerError && <ChatRoomHeader isOffline={data} />
      )}
      <ChatRoomMain selectChatRoom={selectChatRoom} userType={userType} />
    </motion.section>
  );
};

export default ChatRoom;

const ChatRoomHeaderLoading = () => {
  return (
    <header className="w-full px-[10px] py-3">
      <div className="grid grid-cols-[34px_1fr] gap-x-2">
        <div className="size-[34px] animate-pulse rounded-full bg-gray-700" />
        <div className="flex flex-col justify-evenly">
          <div className="h-1/3 w-full animate-pulse bg-gray-700" />
          <div className="h-1/3 w-full animate-pulse bg-gray-700" />
        </div>
      </div>
    </header>
  );
};
