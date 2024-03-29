import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import BankSelect from '@/app/instructor/apply/_components/InstructorAuth/BankSelect';
import { Button } from '@/components/Button';
import Modal from '@/components/Modal/Modal';

interface IFormValues {
  bank: any;
  reason: string;
  accountNumber: number;
}

interface CancelModalProps {
  isOpened: boolean;
  handleClosed: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSubmitCancelForm: (data: IFormValues) => void;
  applicant: string;
  title: string;
  schedule: string;
  paymentMethod: string;
}

const CancelModal = ({
  isOpened,
  handleClosed,
  handleSubmitCancelForm,
  applicant,
  title,
  schedule,
  paymentMethod,
}: CancelModalProps) => {
  const { handleSubmit, control } = useForm<IFormValues>();
  const width = paymentMethod === '가상계좌' ? 'w-[30rem]' : 'w-[25.5rem]';

  const onSubmit = async (data: IFormValues) => {
    // 유저 계좌번호 요청 및 응답 처리 필요
    if (!data.reason || data.reason?.length < 15) {
      toast.error('클래스 거절 사유를 15자 이상 작성해주세요!');
      return;
    }

    handleSubmitCancelForm(data);
    handleClosed();
  };

  return (
    <Modal isOpened={isOpened} handleClosed={handleClosed}>
      <div className={width}>
        <h3 className="flex h-16 w-full items-center justify-center border-b border-solid border-gray-700 text-lg font-semibold">
          수강 취소
        </h3>

        <ul className="mb-4 mt-3.5 flex w-full flex-col gap-2.5 whitespace-nowrap px-6 text-sm font-medium">
          <li className="flex gap-3">
            <p className="w-20 font-semibold">신청자</p>
            <p>{applicant}</p>
          </li>
          <li className="flex gap-3">
            <p className="w-20 shrink-0 font-semibold">신청 클래스</p>
            <p className="w-full truncate">{title}</p>
          </li>
          <li className="flex gap-3">
            <p className="w-20 font-semibold">수업 일시</p>
            <p>{schedule}</p>
          </li>
          {/* 가상계좌 결제일때 만 */}
          {paymentMethod === '가상계좌' && (
            <li className="flex gap-3">
              <p className="w-20 font-semibold">환불 계좌</p>
              <div className="w-full">
                <div className="mb-2 max-w-[160px]">
                  <Controller
                    name="bank"
                    control={control}
                    rules={{
                      required: '은행',
                    }}
                    render={({ field: { onChange } }) => (
                      <BankSelect onChange={onChange} />
                    )}
                  />
                </div>

                <Controller
                  control={control}
                  name="accountNumber"
                  render={({ field }) => (
                    <input
                      onChange={field.onChange}
                      placeholder="계좌번호를 - 없이 입력해주세요."
                      className="h-8 w-full max-w-xs rounded-md px-2 py-1 outline outline-1 outline-gray-500
                focus:outline-sub-color1"
                    />
                  )}
                />
              </div>
            </li>
          )}
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
