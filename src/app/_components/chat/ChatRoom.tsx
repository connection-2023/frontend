import { useQueries } from '@tanstack/react-query';
import { MotionValue, motion } from 'framer-motion';
import { getCheckOnlineList } from '@/lib/apis/chatApi';
import { ChatRoomList } from '@/types/chat';

interface ChatRoomProps {
  selectChatRoom: ChatRoomList;
  mWidth: MotionValue<number> | null;
}

const ChatRoom = ({ mWidth, selectChatRoom }: ChatRoomProps) => {
  const [{ data }] = useQueries({
    queries: [
      {
        queryKey: ['onlineList', selectChatRoom.id],
        queryFn: () => getCheckOnlineList(selectChatRoom.id),
      },
    ],
  });

  console.log(data);

  return (
    <motion.section style={{ width: mWidth ? mWidth : '100%' }}>
      <div>대화</div>
    </motion.section>
  );
};

export default ChatRoom;
