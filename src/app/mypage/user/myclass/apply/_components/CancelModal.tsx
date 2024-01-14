import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';

interface IFormValues {
  reason: string;
}

interface CancelModalProps {
  isOpened: boolean;
  handleClosed: () => void;
  handleSubmitCancelForm: () => void;
}

const CancelModal = ({
  isOpened,
  handleClosed,
  handleSubmitCancelForm,
}: CancelModalProps) => {
  const { handleSubmit, control } = useForm<IFormValues>();

  const onSubmit = async (data: IFormValues) => {
    if (!data.reason || data.reason?.length < 15) {
      toast.error('클래스 거절 사유를 15자 이상 작성해주세요!');
      return;
    }

    toast.success('클래스 승인을 거절하였습니다.');
    handleClosed();
    handleSubmitCancelForm();
  };

  return (
    <Modal isOpened={isOpened} handleClosed={handleClosed}>
      <div className="w-[25.5rem]">
        <h3 className="flex h-16 w-full items-center justify-center border-b border-solid border-gray-700 text-lg font-semibold">
          수강 취소
        </h3>

        <ul className="mb-4 mt-3.5 flex w-full flex-col gap-2.5 whitespace-nowrap px-6 text-sm font-medium">
          <li className="flex gap-3">
            <p className="w-20 font-semibold">신청자</p>
            <p>신청자</p>
          </li>
          <li className="flex gap-3">
            <p className="w-20 shrink-0 font-semibold">신청 클래스</p>
            <p className="w-full truncate">
              K-pop 한번에 정복할 수 있는 재미넘치는 댄스수업 정복할 수 있는
              재미넘치는 댄스수업
            </p>
          </li>
          <li className="flex gap-3">
            <p className="w-20 font-semibold">수업 일시</p>
            <p>23.09.15 13:00-15:00</p>
          </li>
          <li className="flex gap-3">
            <p className="w-20 font-semibold">환불 예정금액</p>
            <p>240,000 (노쇼위약금 10,000원 포함)</p>
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
                placeholder="클래스 취소한 사유를 최소 15자이상 구체적으로 작성해주세요."
                className="text-normal h-36 w-full resize-none whitespace-pre-wrap break-keep rounded-md border border-solid border-gray-500 px-3.5 py-2.5 text-sm font-normal text-gray-100 focus:outline-sub-color1"
              />
            )}
          />

          <div className="my-4 w-20 text-base">
            <Button color="secondary" type="submit">
              제출하기
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CancelModal;
