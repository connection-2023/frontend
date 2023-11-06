'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { CloseSVG } from '@/icons/svg';

const ReceiptModal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const overlayRef = React.useRef(null);

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;

    router.back();
  };

  React.useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed bottom-0 left-0 right-0 top-0 z-10 mx-auto bg-black/60"
      onClick={(e) => {
        if (overlayRef.current !== e.target) return;

        router.back();
      }}
    >
      <div className="bg-checkout-receipt absolute left-1/2 top-1/2 h-[669px] w-[388px] -translate-x-1/2 -translate-y-1/2 px-[2.13rem] ">
        <div className="mb-3 mt-[1.72rem] flex w-full justify-end">
          <button onClick={() => router.back()}>
            <CloseSVG
              width={24}
              height={24}
              className="stroke-sub-color2 stroke-2"
            />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ReceiptModal;
