'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postRefund } from '@/lib/apis/paymentApis';
import { formatClassTime } from '@/utils/dateTimeUtils';
import CancelModal from './CancelModal';
import UniqueButton from '@/components/Button/UniqueButton';
import { IApplyDetailResponse } from '@/types/class';

const CancelApplicationButton = (props: IApplyDetailResponse) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const router = useRouter();
  const {
    representative,
    lecture,
    lectureSchedule,
    regularLectureSchedule,
    payment,
  } = props;

  const schedule = (() => {
    if (lectureSchedule) {
      return formatClassTime(
        lectureSchedule.startDateTime,
        lectureSchedule.endDateTime,
      );
    }
    // 정기클래스일 때 시간 포맷팅 필요
    if (regularLectureSchedule) {
      return '';
    }
    return '';
  })();

  const handleButton = () => {
    setIsModalOpened(true);
  };

  const handleSubmitCancelForm = async (data: { reason: string }) => {
    const requestRefundData = {
      cancelReason: data.reason,
      refundAmount: payment.finalPrice,
    };
    const { statusCode, message } = await postRefund(
      payment.id,
      requestRefundData,
    );

    if (statusCode === 201) {
      router.replace('/mypage/user/myclass/apply');
      toast.success('클래스 신청이 취소 되었습니다.');
    } else toast.error(message);
  };

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
        applicant={representative}
        title={lecture.title}
        schedule={schedule}
        paymentMethod={payment.paymentMethod.name}
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
