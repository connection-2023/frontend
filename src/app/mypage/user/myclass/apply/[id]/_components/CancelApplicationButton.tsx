'use client';
import { useState } from 'react';
import CancelModal from '../../_components/CancelModal';
import UniqueButton from '@/components/Button/UniqueButton';
import { IApplyDetailResponse } from '@/types/class';

const CancelApplicationButton = (props: IApplyDetailResponse) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { representative, lecture, lectureSchedule } = props;

  const handleButton = () => {
    // 수강 취소 로직
    setIsModalOpened(true);
  };

  const handleSubmitCancelForm = () => {};

  return (
    <>
      <div className="w-1/2 md:hidden">
        <UniqueButton size="medium" color="secondary" onClick={handleButton}>
          수강취소
        </UniqueButton>
      </div>
      <div className="hidden w-[4.69rem] md:block">
        <UniqueButton size="small" color="secondary" onClick={handleButton}>
          수강취소
        </UniqueButton>
      </div>

      <CancelModal
        isOpened={isModalOpened}
        handleClosed={() => {
          setIsModalOpened(false);
        }}
        handleSubmitCancelForm={handleSubmitCancelForm}
      />
    </>
  );
};

export default CancelApplicationButton;
