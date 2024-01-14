import Modal from '@/components/Modal/Modal';

interface DeclineModalProps {
  isDeclineModalOpened: boolean;
  handleClosed: () => void;
}

const DeclineModal = ({
  isDeclineModalOpened,
  handleClosed,
}: DeclineModalProps) => {
  return (
    <Modal isOpened={isDeclineModalOpened} handleClosed={handleClosed}>
      <div className="w-[40rem]">
        <h3 className="flex h-16 w-full items-center border-b border-solid border-gray-300 px-6 text-lg font-semibold">
          거절사유
        </h3>

        <ul className="mb-4 mt-3.5 flex w-full flex-col gap-2.5 whitespace-nowrap border-b border-solid border-gray-700 px-6 pb-3.5 text-base font-medium">
          <li className="flex gap-3">
            <p className="w-24 shrink-0 font-bold">신청 클래스</p>
            <p className="truncate">
              K-pop 한번에 정복할 수 있는 재미넘치는 댄스수업이에요.
            </p>
          </li>
          <li className="flex gap-3">
            <p className="w-24 font-bold">수업 일시</p>
            <p>
              23.09.15-23.12.25 <span className="font-bold">12회</span>
            </p>
          </li>
          <li className="flex gap-3">
            <p className="w-24 font-bold">신청금액</p>
            <p>100,000원</p>
          </li>
          <li className="flex gap-3">
            <p className="w-24 shrink-0 font-bold text-sub-color1">거절 사유</p>
            <p className="flex w-full whitespace-pre-wrap break-keep">
              회원이 취소한 경우(본인이 취소했다는 사실은 기억할테니까):
              검정색으로 표시/ 강사가 취소한경우:보라색으로 표시 이렇게하는거
              어려울까요? 강사본명이랑 개인연락처 보여줘야할까요? 정말
              죄송하다는 말씀드립니다. 환불도 빨리 처리하겠습니다.
            </p>
          </li>
        </ul>

        <ul className="mb-4 mt-3.5 flex w-full flex-col gap-2.5 whitespace-nowrap px-6 text-base font-medium">
          <li className="flex gap-3">
            <p className="w-24 shrink-0 font-semibold">환불 요청 시간</p>
            <p>23.09.14 09:00</p>
          </li>
          <li className="flex gap-3">
            <p className="w-24 font-semibold">환불 금액</p>
            <p className="font-bold">10,000원</p>
          </li>
          <li className="flex gap-3">
            <p className="w-24 font-semibold">환불계좌</p>
            <p>신한 100-234-1345583 (김민정)</p>
          </li>
          <li className="flex gap-3">
            <p className="w-24 font-semibold">환불 상태</p>
            <p className="text-gray-300">환불완료</p>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default DeclineModal;
