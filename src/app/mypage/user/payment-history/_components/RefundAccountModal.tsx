import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';

interface RefundAccountModalProps {
  isOpened: boolean;
  handleClosed: () => void;
}
const RefundAccountModal = ({
  isOpened,
  handleClosed,
}: RefundAccountModalProps) =>
  isOpened ? (
    <Modal isOpened={isOpened} handleClosed={handleClosed}>
      <div className="flex h-full w-[40rem] flex-col pb-6 pt-2 font-normal md:h-fit">
        <h3 className="flex h-14 items-center border-b border-solid border-gray-300 px-6 text-lg font-semibold">
          환불계좌 확인
        </h3>

        <ul className="mt-4 flex w-full flex-col gap-y-3.5 px-6 text-base text-gray-100">
          <li className="flex gap-10 whitespace-nowrap">
            <p className="w-16 font-bold">계좌번호</p>
            <p>신한 110-123-456789</p>
          </li>
          <li className="flex gap-10 whitespace-nowrap">
            <p className="w-16 font-bold">예금주</p>
            <p>예금주</p>
          </li>
          <li className="flex gap-10 whitespace-nowrap">
            <p className="w-16 font-bold">환불금액</p>
            <p className="font-semibold">150,000원</p>
          </li>
          <li className="flex gap-10 whitespace-nowrap">
            <p className="w-16 font-bold">환불 상태</p>
            <p className="font-semibold text-main-color">환불대기</p>
          </li>
        </ul>

        <div className="mb-20 mt-auto w-screen px-4 md:hidden">
          <Button color="secondary" size="large">
            닫기
          </Button>
        </div>
      </div>
    </Modal>
  ) : null;

export default RefundAccountModal;
