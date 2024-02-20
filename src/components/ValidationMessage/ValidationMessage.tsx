import React, { ReactNode, useEffect, useRef } from 'react';
import ProgressBar from './ProgressBar';
import Modal from '@/components/Modal/Modal';
import { ErrorMessage } from '@/types/types';

interface ValidationMessageProps {
  title?: string;
  invalidData: ErrorMessage[] | null;
  closeModal: () => void;
}

const ValidationMessage = ({
  invalidData,
  closeModal,
  title = '모두 작성하면 다음페이지로 넘어갈 수 있어요.',
}: ValidationMessageProps) => {
  let timeID: NodeJS.Timeout;
  const overlayRef = useRef(null);

  useEffect(() => {
    timeID = setTimeout(() => closeModal(), 10000);

    return () => {
      clearTimeout(timeID);
    };
  }, [closeModal]);

  const reminderButtonHandler = () => {
    if (invalidData === null) return;
    const element = document.getElementById(invalidData[0].key);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    clearTimeout(timeID);
    closeModal();
  };
  return (
    !!invalidData && (
      <div
        ref={overlayRef}
        className="fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto bg-black/60 backdrop-blur-sm"
        onClick={(e) => {
          if (overlayRef.current !== e.target) return;
          closeModal();
        }}
      >
        <div className="absolute bottom-auto left-1/2 top-1/2 z-modal h-auto w-auto -translate-x-1/2 -translate-y-1/2 rounded-md bg-white pt-0 shadow-float">
          <div className="relative flex h-36 w-full max-w-[31rem] flex-col justify-evenly overflow-hidden rounded-md border border-solid border-black bg-white px-6 shadow-float">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm font-semibold text-main-color">{title}</p>
              <ReminderText>
                {[...new Set(invalidData?.map(({ message }) => message))].join(
                  ', ',
                )}
              </ReminderText>
            </div>
            <ReminderButton reminderButtonHandler={reminderButtonHandler} />
            <ProgressBar />
          </div>
        </div>
      </div>
    )
  );
};

const ReminderButton = ({
  reminderButtonHandler,
}: {
  reminderButtonHandler: () => void;
}) => (
  <div className="flex justify-center">
    <button
      onClick={reminderButtonHandler}
      className="h-9 w-36 rounded-md bg-main-color font-semibold text-white"
    >
      작성하러 가기
    </button>
  </div>
);

const ReminderText = ({ children }: { children: ReactNode }) => (
  <p className="inline-flex w-full justify-center whitespace-nowrap px-1 text-lg">
    <span className="truncate font-semibold">{children}</span>
    을/를 설정해주세요!
  </p>
);

export default ValidationMessage;
