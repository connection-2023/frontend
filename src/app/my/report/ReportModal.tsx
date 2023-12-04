import Modal from '@/components/Modal/Modal';

interface ReportModalProps {
  isOpen: boolean;
  closeModal: () => void;
  target: string | null;
  reportTypes: string[];
  reason: string;
  status: '처리중' | '처리완료';
  response?: string;
}

const ReportModal = ({
  isOpen,
  closeModal,
  target,
  reportTypes,
  reason,
  status,
  response,
}: ReportModalProps) => {
  return (
    <Modal isOpened={isOpen} handleClosed={closeModal}>
      <ul className="flex w-full min-w-[30rem] flex-col border-b border-solid border-gray-700 px-[1.13rem] py-4 text-sm font-semibold text-gray-300">
        <li className="flex gap-3">
          <p className="w-20">신고유저</p>
          <span className="font-medium">{target}</span>
        </li>
        <li className="flex gap-3">
          <p className="w-20">신고사유</p>
          <div className="flex flex-col whitespace-nowrap">
            {reportTypes.map((type) => (
              <span key={type} className="font-medium">
                {type}
              </span>
            ))}
          </div>
        </li>
        <li className="mt-3 flex">{reason}</li>
      </ul>

      <div className="mb-3 min-h-[6rem] w-full border-b border-solid border-gray-700 px-[1.13rem] py-4 text-sm">
        <p className="mb-2 font-semibold text-gray-100">관리자 답변</p>
        {status === '처리중' ? <></> : <p>{response}</p>}
      </div>

      <div className="mb-4 flex w-full gap-3 px-[1.13rem] text-sm font-semibold">
        <button className="h-7 w-1/2 rounded-md bg-gray-500 text-white">
          추가 문의하기
        </button>
        <button
          onClick={closeModal}
          className="h-7 w-1/2 rounded-md bg-black text-white"
        >
          확인
        </button>
      </div>
    </Modal>
  );
};

export default ReportModal;
