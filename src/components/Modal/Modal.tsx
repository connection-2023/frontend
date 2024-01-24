'use client';
import React, { useEffect, useRef } from 'react';
import useBottomSheet from '@/hooks/useBottomSheet';
import ModalContent from './ModalContent';

interface ModalProps {
  children: React.ReactNode;
  isOpened: boolean;
  handleClosed: () => void;
  disableModalSwipe?: boolean;
}

const Modal = ({
  children,
  isOpened,
  handleClosed,
  disableModalSwipe = false,
}: ModalProps) => {
  const { onDragEnd, controls } = useBottomSheet(handleClosed, isOpened);
  const overlayRef = useRef(null);

  const handleKeyUp = (e: globalThis.KeyboardEvent) => {
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
      <ModalContent
        children={children}
        handleClosed={handleClosed}
        disableModalSwipe={disableModalSwipe}
        onDragEnd={onDragEnd}
        controls={controls}
      />
    </div>
  ) : null;
};

export default Modal;
