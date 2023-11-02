import Modal from 'react-modal';
import { TrashcanSVG } from '@/icons/svg';

interface IDraftListModal {
  isOpen: boolean;
  closeModal: () => void;
}

const DraftListModal = ({ isOpen, closeModal }: IDraftListModal) => {
  return (
    <Modal
      onRequestClose={closeModal}
      isOpen={isOpen}
      style={customModalStyles}
      ariaHideApp={false}
    >
      <h1 className="flex justify-center border-b border-solid border-sub-color2 py-3 text-lg">
        임시저장 불러오기(5)
      </h1>
      <ul className="flex flex-col gap-4 px-4 py-6">
        <li className="flex justify-between gap-2">
          <h2 className="w-2/3 cursor-pointer truncate">
            안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
          </h2>
          <div className="flex gap-3">
            <data className="whitespace-nowrap text-sub-color2">
              23.11.03 13:55
            </data>
            <button>
              <TrashcanSVG className="h-6 w-6 stroke-sub-color2" />
            </button>
          </div>
        </li>
      </ul>
    </Modal>
  );
};

export default DraftListModal;

const customModalStyles: ReactModal.Styles = {
  content: {
    width: '50%',
    maxWidth: '40.0625rem',
    height: '18rem',
    padding: '0',
    zIndex: '10',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderColor: 'black',
    boxShadow: '0 1px 4px 1px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
};
