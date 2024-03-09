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
      let newValue;

      const minValue = point === 'y' ? 103 : 281;
      const maxValue = point === 'y' ? 644 : 608;

      if (operation === 'add') {
        newValue = currentValue + delta;
      } else if (operation === 'subtract') {
        newValue = currentValue - delta;
      } else {
        newValue = currentValue + delta;
      }

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
        <YHandle
          handleDrag={handleResizableDrag}
          target={mHeight}
          operation="subtract"
        />
        <div className="flex items-stretch">
          <XHandle
            handleDrag={handleResizableDrag}
            target={mWidth}
            operation="subtract"
          />
          <Chat
            mHeight={mHeight}
            mWidth={mWidth}
            StartChatPositionDrag={StartChatPositionDrag}
          />
          <XHandle
            handleDrag={handleResizableDrag}
            target={mWidth}
            operation="add"
          />
        </div>
        <YHandle
          handleDrag={handleResizableDrag}
          target={mHeight}
          operation="add"
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
}

const XHandle = ({ handleDrag, target, operation }: HandleProps) => {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={0}
      dragMomentum={false}
      onDrag={(event, info) =>
        handleDrag({ info, target, point: 'x', operation })
      }
      className="w-2 cursor-col-resize"
    />
  );
};

const YHandle = ({ handleDrag, target, operation }: HandleProps) => {
  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={0}
      dragMomentum={false}
      onDrag={(event, info) =>
        handleDrag({ info, target, point: 'y', operation })
      }
      className="h-2 cursor-row-resize"
    />
  );
};
