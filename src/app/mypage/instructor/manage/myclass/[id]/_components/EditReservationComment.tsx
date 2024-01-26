import { useState } from 'react';
import UniqueButton from '@/components/Button/UniqueButton';

/* eslint-disable no-unused-vars */
interface EditReservationComment {
  reservationComment: string;
  updateReservation: (
    key: 'notification' | 'reservationComment' | 'holidays',
    value: string | Date[],
  ) => void;
}
/* eslint-enable no-unused-vars */
const EditReservationComment = ({
  reservationComment,
  updateReservation,
}: EditReservationComment) => {
  const [comment, setComment] = useState(reservationComment);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleReservationUpdate = () => {
    if (reservationComment !== comment) {
      updateReservation('reservationComment', comment);
      setIsEditMode(false);
    }
  };

  return (
    <div className="relative">
      <textarea
        value={comment}
        disabled={!isEditMode}
        onChange={(event) => setComment(event.target.value)}
        placeholder={`수강생이 클래스 신청시 예약 화면에서 보여지는 사항입니다.\n클래스를 시작하기 전 숙지해야 할 사항을 적어주세요`}
        className="h-32 w-full resize-none whitespace-pre-wrap break-keep rounded-md border border-solid border-gray-700 px-[0.69rem] py-[0.62rem] text-sm focus:outline-sub-color1 disabled:bg-white "
      />
      {isEditMode ? (
        <div className="absolute bottom-3 right-2 flex w-24 gap-2 text-sm">
          <UniqueButton
            size="xsmall"
            color="secondary"
            onClick={handleReservationUpdate}
          >
            저장
          </UniqueButton>
          <UniqueButton
            size="xsmall"
            color="secondary"
            onClick={() => setIsEditMode(false)}
          >
            취소
          </UniqueButton>
        </div>
      ) : (
        <div className="absolute bottom-3 right-2 w-10 text-sm">
          <UniqueButton
            size="xsmall"
            color="secondary"
            onClick={() => setIsEditMode(true)}
          >
            수정
          </UniqueButton>
        </div>
      )}
    </div>
  );
};

export default EditReservationComment;
