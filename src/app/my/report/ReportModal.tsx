import Modal from 'react-modal';

const data = {
  reportedUser: '가비쌤',
  reason: '혐오 발언 또는 상징',
  detail: `제가 진행한 수업 후기에 욕설을 기재하였습니다.
    또한 금품갈취라는 허위 사실까지 작성하여 저의 이미지에 큰 타격을 입혔습니다.`,
  response: `해당 내용 확인하였습니다. 신고하신 계정은 정지 조치하였으며 해당 후기는 관리자 권한으로 삭제하였습니다.
    소소한 위로의 말씀 전하며 앞으로도 불편한 사항 있으시면 언제든지 편하게 문의주세요. 빠른 답변 도와드리겠습니다.`,
};

interface ReportModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ReportModal = ({ isOpen, closeModal }: ReportModalProps) => {
  const { reportedUser, reason, detail, response } = data;

  return (
    <Modal
      onRequestClose={closeModal}
      isOpen={isOpen}
      style={ReportModalStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
    >
      <ul className="flex w-full flex-col border-b border-solid border-gray-700 px-[1.13rem] py-4 text-sm font-semibold text-gray-300">
        <li className="flex gap-3">
          <p className="w-20">신고한 회원</p>
          <span className="font-medium">{reportedUser}</span>
        </li>
        <li className="flex gap-3">
          <p className="w-20">신고사유</p>
          <span className="font-medium">{reason}</span>
        </li>
        <li className="mt-3 flex">{detail}</li>
      </ul>

      <div className="mb-3 w-full border-b border-solid border-gray-700 px-[1.13rem] py-4 text-sm">
        <p className="mb-2 font-semibold text-gray-100">관리자 답변</p>
        <p>{response}</p>
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

const ReportModalStyles: ReactModal.Styles = {
  content: {
    width: '80%',
    height: 'fit-content',
    maxWidth: '32rem',
    zIndex: '10',
    padding: '0',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '0.3125rem',
    boxShadow: '0 1px 4px 0px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
};
