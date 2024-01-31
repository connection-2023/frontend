'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { CloseSVG } from '@/icons/svg';

interface RouterModalProps {
  path?: string;
  children: React.ReactNode;
  closeButtonView?: boolean;
}

const RouterModal = ({
  path,
  children,
  closeButtonView = true,
}: RouterModalProps) => {
  const router = useRouter();
  const overlayRef = useRef(null);

  const handleRouter = () => (path ? router.push(path) : router.back());

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;

    handleRouter();
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (overlayRef.current !== e.target) return;
        handleRouter();
      }}
    >
      <div className="absolute left-1/2 top-1/2 max-w-[40rem] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-white py-4 shadow-float">
        {closeButtonView && (
          <button onClick={handleRouter} className="absolute right-6 top-5">
            <CloseSVG
              width="24"
              height="24"
              className="stroke-gray-500 stroke-2"
            />
          </button>
        )}

        {children}
      </div>
    </div>
  );
};

export default RouterModal;
