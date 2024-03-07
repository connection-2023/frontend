import { useMotionValue } from 'framer-motion';
import { useCallback } from 'react';

const ChatRoom = () => {
  const mWidth = useMotionValue(375);

  const handleDrag = useCallback((event, info) => {
    let newHeight = mWidth.get() + info.delta.w;
    if (newHeight > 200 && newHeight < 400) {
      mWidth.set(mWidth.get() + info.delta.w);
    }
  }, []);

  return (
    <section className="sm:min-w-[375px]" style={{ width: mWidth.get() }}>
      <div>대화</div>
    </section>
  );
};

export default ChatRoom;
