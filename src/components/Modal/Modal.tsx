'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { CloseSVG } from '@/icons/svg';

interface ModalProps {
  children: React.ReactNode;
  isOpened: boolean;
  handleClosed: () => void;
}
const Modal = ({ children, isOpened, handleClosed }: ModalProps) => {
  const overlayRef = React.useRef(null);

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    handleClosed();
  };

  React.useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  return isOpened ? (
    <div
      ref={overlayRef}
      className="z-modal fixed bottom-0 left-0 right-0 top-0 mx-auto bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (overlayRef.current !== e.target) return;
        handleClosed();
      }}
    >
      <div className="absolute left-1/2 top-1/2 h-auto w-auto -translate-x-1/2 -translate-y-1/2 rounded-md bg-white shadow-float">
        <button onClick={handleClosed} className="absolute right-2 top-2">
          <CloseSVG
            width="24"
            height="24"
            className="stroke-gray-500 stroke-2"
          />
        </button>

        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
