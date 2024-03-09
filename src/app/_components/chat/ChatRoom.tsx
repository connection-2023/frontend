import { MotionValue, motion } from 'framer-motion';

interface ChatRoomProps {
  mWidth: MotionValue<number>;
}

const ChatRoom = ({ mWidth }: ChatRoomProps) => {
  return (
    <motion.section style={{ width: mWidth }}>
      <div>대화</div>
    </motion.section>
  );
};

export default ChatRoom;
