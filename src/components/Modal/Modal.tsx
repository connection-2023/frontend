'use client';
import { useEffect, useRef, useState } from 'react';
import { CloseSVG } from '../../../public/icons/svg';
import useBottomSheet from '@/hooks/useBottomSheet';
import { motion } from 'framer-motion';
import useMediaQuery from '@/hooks/useMediaQuery';

interface ModalProps {
  children: React.ReactNode;
  isOpened: boolean;
  handleClosed: () => void;
}

const Modal = ({ children, isOpened, handleClosed }: ModalProps) => {
  const isSm = useMediaQuery('(min-width: 640px)');
  const { onDragEnd, controls } = useBottomSheet(handleClosed, isOpened);
  const overlayRef = useRef(null);

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    handleClosed();
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return isOpened ? (
    <div
      ref={overlayRef}
      className="fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (overlayRef.current !== e.target) return;
        handleClosed();
      }}
    >
      <motion.div
        drag={isSm ? false : 'y'}
        onDragEnd={isSm ? undefined : onDragEnd}
        initial={isSm ? false : 'hidden'}
        animate={isSm ? undefined : controls}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 400,
        }}
        variants={{
          visible: { y: 0 },
          hidden: { y: '100%' },
        }}
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        className={`absolute bottom-0 z-modal h-[90%] w-screen rounded-t-lg bg-white pt-2.5 sm:left-1/2 sm:top-1/2 sm:h-auto sm:w-auto sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-md sm:pt-0 sm:shadow-float`}
      >
        <button
          onClick={handleClosed}
          className="absolute right-2 top-2 hidden sm:block"
        >
          <CloseSVG
            width="24"
            height="24"
            className="stroke-gray-500 stroke-2"
          />
        </button>

        <div className="mb-8 flex w-full justify-center sm:hidden">
          <button className="h-1.5 w-16 rounded-lg bg-gray-700" />
        </div>

        {children}
      </motion.div>
    </div>
  ) : null;
};

export default Modal;
