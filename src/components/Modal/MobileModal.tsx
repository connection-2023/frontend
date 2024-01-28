'use client';
import { m } from 'framer-motion';
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
  const { onDragEnd, controls } = useBottomSheet(handleClosed);
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
      <m.div
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
        className="absolute bottom-0 z-modal h-[90%] w-screen rounded-t-lg bg-white pt-2.5"
      >
        <div className="mb-8 flex w-full justify-center">
          <button className="h-1.5 w-16 rounded-lg bg-gray-700" />
        </div>
        {children}
      </m.div>
    </div>
  ) : null;
};

export default MobileModal;
