import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';

interface IFormValues {
  reason: string;
}

interface DeclineModalProps {
  isDeclineModalOpened: boolean;
  handleClosed: () => void;
  handleSubmitDeclineForm: () => void;
}

const DeclineModal = ({
  isDeclineModalOpened,
  handleClosed,
  handleSubmitDeclineForm,
}: DeclineModalProps) => {
  const { handleSubmit, control } = useForm<IFormValues>();

  const onSubmit = async (data: IFormValues) => {
    if (!data.reason || data.reason?.length < 15) {
      toast.error('클래스 거절 사유를 15자 이상 작성해주세요!');
      return;
    }

    toast.success('클래스 승인을 거절하였습니다.');
    handleClosed();
    handleSubmitDeclineForm();
  };

  return (
    <Modal isOpened={isDeclineModalOpened} handleClosed={handleClosed}>
      <div className="w-[25.5rem]">
        <h3 className="flex h-16 w-full items-center justify-center border-b border-solid border-gray-700 text-lg font-semibold">
          클래스 거절
        </h3>

        <ul className="mb-4 mt-3.5 flex w-full flex-col gap-2.5 whitespace-nowrap px-6 text-sm font-semibold">
          <li className="flex gap-3">
            <p className="w-20">신청자</p>
            <p>신청자</p>
          </li>
          <li className="flex gap-3">
            <p className="w-20">신청 클래스</p>
            <p>신청자</p>
          </li>
          <li className="flex gap-3">
            <p className="w-20">결제금액</p>
            <p>신청자</p>
          </li>
          <li className="flex gap-3 text-main-color">
            <p className="w-20">환불 예정금액</p>
            <p>10000원</p>
          </li>
        </ul>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-end px-6"
        >
          <Controller
            control={control}
            name="reason"
            render={({ field }) => (
              <textarea
                onChange={field.onChange}
                placeholder="수강생의 클래스 신청을 취소(거절)한 사유를 구체적으로 
            최소 15자이상 작성해주세요."
                className="text-normal h-36 w-full resize-none whitespace-pre-wrap break-keep rounded-md border border-solid border-gray-500 px-3.5 py-2.5 text-sm font-normal text-gray-100 focus:outline-sub-color1"
              />
            )}
          />

          <div className="my-4 w-20">
            <Button color="secondary" type="submit">
              제출하기
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default DeclineModal;
