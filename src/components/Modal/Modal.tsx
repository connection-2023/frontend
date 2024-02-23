'use client';
import { useRef } from 'react';
import useBottomSheet from '@/hooks/useBottomSheet';
import ModalContent from './ModalContent';

interface ModalProps {
  children: React.ReactNode;
  isOpened: boolean;
  handleClosed: () => void;
  disableModalSwipe?: boolean;
  modalHistroryControl?: boolean;
}

const Modal = ({
  children,
  isOpened,
  handleClosed,
  disableModalSwipe = false,
  modalHistroryControl = true,
}: ModalProps) => {
  const skipBackOnUnmount = useRef(false);

  const closeModalHandler = () => {
    handleClosed();
    if (modalHistroryControl) {
      window.onpopstate = null;
      window.history.back();
      skipBackOnUnmount.current = true;
    }
  };

  const { onDragEnd, controls } = useBottomSheet(closeModalHandler, isOpened);
  const overlayRef = useRef(null);

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
        // eslint-disable-next-line react/no-children-prop
        children={children}
        handleClosed={handleClosed}
        disableModalSwipe={disableModalSwipe}
        onDragEnd={onDragEnd}
        controls={controls}
        skipBackOnUnmount={skipBackOnUnmount}
        modalHistroryControl={modalHistroryControl}
      />
    </div>
  ) : null;
};

export default Modal;
