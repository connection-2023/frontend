import React, { ReactNode } from 'react';

const ReminderButton = () => (
  <div className="flex justify-center">
    <button className="h-9 w-36 rounded-md bg-main-color font-semibold text-white">
      작성하러 가기
    </button>
  </div>
);

const ReminderText = ({ children }: { children: ReactNode }) => (
  <p className="inline-flex w-full whitespace-nowrap px-1 text-lg">
    <span className="truncate font-semibold">{children}</span>
    을/를설정해주세요!
  </p>
);

const ValidationToast = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex h-36 w-full max-w-[31rem] flex-col justify-evenly rounded-md border border-solid border-black bg-white shadow-[0_1px_5px_0px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-semibold text-main-color">
            모두 작성하면 다음페이지로 넘어갈 수 있어요.
          </p>
          <ReminderText>
            사진, 제목, 장르, 인원 , 진행방식 , 난이도 , 가격
          </ReminderText>
        </div>
        <ReminderButton />
      </div>
    </div>
  );
};

export default ValidationToast;
