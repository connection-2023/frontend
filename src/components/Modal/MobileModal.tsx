'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import useBottomSheet from '@/hooks/useBottomSheet';

interface MobileModalProps {
  isOpened: boolean;
  children: React.ReactNode;
  handleClosed: () => void;
}

const MobileModal = ({
  isOpened,
  children,
  handleClosed,
}: MobileModalProps) => {
  const { onDragEnd, controls } = useBottomSheet(handleClosed, isOpened);
  const overlayRef = useRef(null);

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    handleClosed();
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  return isOpened ? (
    <div
      ref={overlayRef}
      className="fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto bg-black/60 backdrop-blur-sm sm:hidden"
      onClick={(e) => {
        if (overlayRef.current !== e.target) return;
        handleClosed();
      }}
    >
      <motion.div
        drag="y"
        onDragEnd={onDragEnd}
        initial="hidden"
        animate={controls}
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
        className="absolute left-0 right-0 top-[20%] z-modal mx-auto h-full rounded-t-lg bg-white pt-2.5 sm:hidden"
      >
        <div className="mb-8 flex w-full justify-center">
          <button className="h-1.5 w-16 rounded-lg bg-gray-700" />
        </div>
        {children}
      </motion.div>
    </div>
  ) : null;
};

export default MobileModal;
