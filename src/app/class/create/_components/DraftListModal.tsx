import { useRouter } from 'next/navigation';
import Modal from 'react-modal';
import { TrashcanSVG } from '@/icons/svg';
import { IGetClassDrafts } from '@/types/class';

interface IDraftListModal {
  isOpen: boolean;
  closeModal: () => void;
  classDraftList: IGetClassDrafts[];
}

const DraftListModal = ({
  isOpen,
  closeModal,
  classDraftList,
}: IDraftListModal) => {
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

      <DraftList classDraftList={classDraftList} closeModal={closeModal} />
    </Modal>
  );
};

export default DraftListModal;

interface DraftListProps {
  classDraftList: IGetClassDrafts[];
  closeModal: () => void;
}

const DraftList = ({ classDraftList, closeModal }: DraftListProps) => {
  const router = useRouter();

  const selectDraft = (id: string, step: string | null) => {
    router.push(`/class/create?step=${step === null ? 0 : step}&id=${id}`);
    closeModal();
  };

  return (
    <ul className="flex flex-col gap-4 px-4 py-6">
      {classDraftList.map(({ id, updatedAt, title, step }) => {
        const date = new Date(updatedAt);
        const formattedDate = `${date.getFullYear()}.${
          date.getMonth() + 1
        }.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

        return (
          <li key={id} className="flex justify-between gap-2">
            <h2
              className="w-2/3 cursor-pointer truncate"
              onClick={() => selectDraft(id, step)}
            >
              {title === null ? '제목 없음' : title}
            </h2>
            <div className="flex gap-3">
              <data className="whitespace-nowrap text-sub-color2">
                {formattedDate}
              </data>
              <button>
                <TrashcanSVG className="h-6 w-6 stroke-sub-color2" />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

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
