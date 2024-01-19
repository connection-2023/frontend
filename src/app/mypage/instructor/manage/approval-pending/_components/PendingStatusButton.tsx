import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { patchPendingStatus } from '@/lib/apis/instructorApi';
import Button from '@/components/Button/Button';
import UniqueButton from '@/components/Button/UniqueButton';
import { IUpdatePaymentStatusRequestData } from '@/types/instructor';
/* eslint-disable no-unused-vars */
interface PendingStatusButtonProps {
  id: number;
  lectureId: number;
  isApproved: boolean;
  isDeclined: boolean;
  handleDeclineModalStatus: (status: boolean) => void;
  handleApproveStatus: (status: boolean) => void;
}
/* eslint-enable no-unused-vars */
const PendingStatusButton = ({
  id,
  lectureId,
  isApproved,
  isDeclined,
  handleDeclineModalStatus,
  handleApproveStatus,
}: PendingStatusButtonProps) => {
  const mutation = useMutation({
    mutationFn: (requestData: IUpdatePaymentStatusRequestData) => {
      return patchPendingStatus(requestData);
    },
  });

  const handleApprove = () => {
    // 승인
    const requestStatusData = {
      paymentId: id,
      status: 'DONE',
    };

    mutation.mutate(requestStatusData, {
      onError: (error) => {
        toast.error(error.message);
      },

      onSuccess: () => {
        handleApproveStatus(true);
        toast.success('승인 되었습니다!');
      },
    });
  };

  const handleApproveCancel = () => {
    // 승인/거절 취소
    const requestStatusData = {
      paymentId: id,
      status: 'WAITING_FOR_DEPOSIT',
      lectureId,
    };

    mutation.mutate(requestStatusData, {
      onError: (error) => {
        toast.error(error.message);
      },

      onSuccess: () => {
        handleApproveStatus(false);
        toast.success('취소 되었습니다!');
      },
    });
  };

  return (
    <div className="flex w-32 justify-between whitespace-nowrap text-sm">
      <div className="w-11">
        {isApproved ? (
          <UniqueButton
            color="secondary"
            size="medium"
            onClick={handleApproveCancel}
          >
            취소
          </UniqueButton>
        ) : (
          <Button
            color="secondary"
            size="medium"
            onClick={() => handleDeclineModalStatus(true)}
          >
            거절
          </Button>
        )}
      </div>

      <div className="w-[4.5rem]">
        {isApproved ? (
          <div className="flex h-[35px] w-full items-center justify-center rounded-md bg-gray-300 text-white">
            {isDeclined ? '거절' : '승인완료'}
          </div>
        ) : (
          <Button color="default" size="medium" onClick={handleApprove}>
            승인
          </Button>
        )}
      </div>
    </div>
  );
};

export default PendingStatusButton;
