'use client';
import React, { useEffect, useRef } from 'react';
import useBottomSheet from '@/hooks/useBottomSheet';
import ModalContent from './ModalContent';
import { usePathname } from 'next/navigation';

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
  const closeModalHandler = () => {
    handleClosed();
    window.onpopstate = null;
    window.history.back();
  };

  const pathname = usePathname();
  const { onDragEnd, controls } = useBottomSheet(closeModalHandler, isOpened);
  const overlayRef = useRef(null);

  const handleKeyUp = (e: globalThis.KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    closeModalHandler();
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (isOpened) {
      window.history.pushState(null, '', pathname);

      window.onpopstate = () => {
        handleClosed();
        window.onpopstate = null;
      };
    }

    return () => {
      window.onpopstate = null;
    };
  }, [isOpened]);

  return isOpened ? (
    <div
      ref={overlayRef}
      className="fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (overlayRef.current !== e.target) return;
        closeModalHandler();
      }}
    >
      <ModalContent
        children={children}
        handleClosed={closeModalHandler}
        disableModalSwipe={disableModalSwipe}
        onDragEnd={onDragEnd}
        controls={controls}
      />
    </div>
  ) : null;
};

export default Modal;
