'use client';
import {
  MotionValue,
  PanInfo,
  motion,
  useDragControls,
  useMotionValue,
} from 'framer-motion';
import { useCallback, useRef } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import Chat from './Chat';

const ChatContainer = () => {
  const mWidth = useMotionValue(375);
  const mHeight = useMotionValue(625);

  const isSm = useMediaQuery('(min-width: 640px)');
  const chatPositionControls = useDragControls();
  const constraintsRef = useRef(null);

  const handleResizableDrag = useCallback(
    ({
      info,
      target,
      point,
      operation,
    }: {
      event?: PointerEvent | MouseEvent | TouchEvent;
      info: PanInfo;
      target: MotionValue<number>;
      point: 'x' | 'y';
      operation: 'add' | 'subtract';
    }) => {
      const delta = info.delta[point];
      const currentValue = target.get();
      const newValue =
        operation === 'subtract' ? currentValue - delta : currentValue + delta;

      const minValue = point === 'y' ? 103 : 281;
      const maxValue = point === 'y' ? 644 : 608;

      if (newValue > minValue && newValue < maxValue) {
        target.set(newValue);
      }
    },
    [],
  );

  const StartChatPositionDrag = (event: React.PointerEvent<HTMLElement>) => {
    chatPositionControls.start(event);
  };

  return (
    <motion.article
      ref={constraintsRef}
      layoutId="chat"
      className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto flex h-screen max-h-screen w-screen items-center justify-center"
    >
      <motion.main
        drag={isSm}
        dragListener={false}
        dragControls={chatPositionControls}
        dragConstraints={constraintsRef}
        className="pointer-events-auto z-modal flex flex-col bg-white shadow-[0px_0px_4px_1px_rgba(0,0,0,0.25)] sm:rounded-md"
        dragMomentum={false}
      >
        <DragHandle
          handleDrag={handleResizableDrag}
          target={mHeight}
          operation="subtract"
          point="y"
        />
        <div className="flex items-stretch">
          <DragHandle
            handleDrag={handleResizableDrag}
            target={mWidth}
            operation="subtract"
            point="x"
          />
          <Chat
            mHeight={mHeight}
            mWidth={mWidth}
            StartChatPositionDrag={StartChatPositionDrag}
          />
          <DragHandle
            handleDrag={handleResizableDrag}
            target={mWidth}
            operation="add"
            point="x"
          />
        </div>
        <DragHandle
          handleDrag={handleResizableDrag}
          target={mHeight}
          operation="add"
          point="y"
        />
      </motion.main>
    </motion.article>
  );
};

export default ChatContainer;

interface HandleProps {
  target: MotionValue<number>;
  handleDrag: ({
    info,
    target,
    point,
    operation,
  }: {
    event?: PointerEvent | MouseEvent | TouchEvent;
    info: PanInfo;
    target: MotionValue<number>;
    point: 'x' | 'y';
    operation: 'add' | 'subtract';
  }) => void;
  operation: 'add' | 'subtract';
  point: 'x' | 'y';
}

const DragHandle = ({ handleDrag, target, operation, point }: HandleProps) => {
  return (
    <motion.div
      drag={point}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={0}
      dragMomentum={false}
      onDrag={(event, info) => handleDrag({ info, target, point, operation })}
      className={
        point === 'x' ? 'w-2 cursor-col-resize' : 'h-2 cursor-row-resize'
      }
    />
  );
};
