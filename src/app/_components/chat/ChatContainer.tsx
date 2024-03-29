'use client';
import {
  MotionValue,
  PanInfo,
  motion,
  useDragControls,
  useMotionValue,
} from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import { CHAT_BOX_SIZE_LIMITS } from '@/constants/constants';
import useMediaQuery from '@/hooks/useMediaQuery';
import ChatMain from './ChatMain';
import { userType } from '@/types/auth';

interface ChatContsinerProps {
  id: string;
  userType: userType;
}

const ChatContainer = ({ id, userType }: ChatContsinerProps) => {
  const { height, width } = useWindowSize();
  const mWidth = useMotionValue(375);
  const mHeight = useMotionValue(625);
  const [dragState, setDragState] = useState<{
    point: null | 'x' | 'y';
    isDragging: boolean;
  }>({ point: null, isDragging: false });

  const isSm = useMediaQuery('(min-width: 640px)');
  const chatPositionControls = useDragControls();
  const constraintsRef = useRef(null);

  const handleDragState = (isDragging: boolean, point: 'x' | 'y') => {
    setDragState({ point, isDragging });
  };

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

      const minValue =
        point === 'y'
          ? CHAT_BOX_SIZE_LIMITS.MIN_HEIGHT
          : CHAT_BOX_SIZE_LIMITS.MIN_WIDTH;
      const maxValue =
        point === 'y'
          ? CHAT_BOX_SIZE_LIMITS.MAX_HEIGHT
          : CHAT_BOX_SIZE_LIMITS.MAX_WIDTH;

      if (newValue > minValue && newValue < maxValue) {
        target.set(newValue);
      }
    },
    [],
  );

  useEffect(() => {
    const adjustSize = () => {
      const newWidth = Math.max(width - 288, CHAT_BOX_SIZE_LIMITS.MIN_WIDTH);
      const newHeight = Math.max(height - 64, CHAT_BOX_SIZE_LIMITS.MIN_HEIGHT);

      if (mWidth.get() > newWidth) {
        mWidth.set(newWidth);
      }

      if (mHeight.get() > newHeight) {
        mHeight.set(newHeight);
      }
    };

    adjustSize();
  }, [width, height]);

  const StartChatPositionDrag = (event: React.PointerEvent<HTMLElement>) => {
    chatPositionControls.start(event);
  };

  return (
    <motion.article
      ref={constraintsRef}
      layoutId="chat"
      className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-chat mx-auto flex h-screen max-h-screen w-screen items-center justify-center"
    >
      <motion.main
        drag={isSm}
        dragListener={false}
        dragControls={chatPositionControls}
        dragConstraints={constraintsRef}
        className="pointer-events-auto z-chat flex flex-col bg-white shadow-[0px_0px_4px_1px_rgba(0,0,0,0.25)] sm:rounded-md"
        dragMomentum={false}
      >
        {isSm && (
          <DragHandle
            handleDrag={handleResizableDrag}
            handleDragState={handleDragState}
            target={mHeight}
            operation="subtract"
            point="y"
          />
        )}
        <div className="flex items-stretch">
          {isSm && (
            <DragHandle
              handleDrag={handleResizableDrag}
              handleDragState={handleDragState}
              target={mWidth}
              operation="subtract"
              point="x"
            />
          )}
          <ChatMain
            id={id}
            dragState={dragState}
            mHeight={isSm ? mHeight : null}
            mWidth={isSm ? mWidth : null}
            userType={userType}
            StartChatPositionDrag={StartChatPositionDrag}
          />
          {isSm && (
            <DragHandle
              handleDrag={handleResizableDrag}
              handleDragState={handleDragState}
              target={mWidth}
              operation="add"
              point="x"
            />
          )}
        </div>
        {isSm && (
          <DragHandle
            handleDrag={handleResizableDrag}
            handleDragState={handleDragState}
            target={mHeight}
            operation="add"
            point="y"
          />
        )}
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
  handleDragState: (isDragging: boolean, point: 'x' | 'y') => void;
}

const DragHandle = ({
  handleDrag,
  target,
  operation,
  point,
  handleDragState,
}: HandleProps) => {
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
      onDragEnd={() => {
        handleDragState(false, point);
      }}
      onDragStart={() => {
        handleDragState(true, point);
      }}
    />
  );
};
