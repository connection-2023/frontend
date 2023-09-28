import React, { ReactNode } from 'react';
import ProgressBar from './ProgressBar';

const ValidationToast = ({ invalidData }: { invalidData: string[] }) => {
  const reminderButtonHandler = () => {
    const element = document.getElementById(invalidData[0]);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    //추후 setFocus로 변경 가능 시 변경 예정
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative flex h-36 w-full max-w-[31rem] flex-col justify-evenly rounded-md border border-solid border-black bg-white shadow-[0_1px_5px_0px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-semibold text-main-color">
            모두 작성하면 다음페이지로 넘어갈 수 있어요.
          </p>
          <ReminderText>{invalidData.join(', ')}</ReminderText>
        </div>
        <ReminderButton reminderButtonHandler={reminderButtonHandler} />
        <ProgressBar />
      </div>
    </div>
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

export default ValidationToast;
