'use client';
import { useEffect, useRef } from 'react';
import { DoubleRightSVG } from '@/icons/svg';

interface ModalProps {
  children: React.ReactNode;
  isOpened: boolean;
  handleClosed: () => void;
}

const SidebarModal = ({ children, isOpened, handleClosed }: ModalProps) => {
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
      className="fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto h-screen bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (overlayRef.current !== e.target) return;
        handleClosed();
      }}
    >
      {/* 애니메이션 추후 추가 예정 */}
      <div className="border-box absolute left-0 top-0 h-screen w-1/4 rounded-md bg-white px-9 py-[4.81rem] shadow-float">
        <button onClick={handleClosed} className="absolute right-2 top-2">
          <DoubleRightSVG width="28" height="28" className="rotate-180" />
        </button>

        {children}
      </div>
    </div>
  ) : null;
};

export default SidebarModal;
