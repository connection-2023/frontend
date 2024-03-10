import { MotionValue, motion } from 'framer-motion';

interface ChatRoomProps {
  mWidth: MotionValue<number> | null;
}

const ChatRoom = ({ mWidth }: ChatRoomProps) => {
  return (
    <motion.section style={{ width: mWidth ? mWidth : '100%' }}>
      <div>대화</div>
    </motion.section>
  );
};

export default ChatRoom;
