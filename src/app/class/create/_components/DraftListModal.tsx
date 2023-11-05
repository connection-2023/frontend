import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { CloseSVG, TrashcanSVG } from '@/icons/svg';
import { getClassDraft } from '@/lib/apis/classApi';
import { useClassCreateStore } from '@/store/classCreate';
import { IGetClassDrafts } from '@/types/class';

interface IDraftListModal {
  isOpen: boolean;
  closeModal: () => void;
  classDraftList: IGetClassDrafts[];
  createDraft: () => Promise<void>;
  deleteClassDraftList: (deleteId: string) => Promise<void>;
}

const DraftListModal = ({
  isOpen,
  closeModal,
  classDraftList,
  createDraft,
  deleteClassDraftList,
}: IDraftListModal) => {
  const closeWithoutSelection = async () => {
    if (classDraftList.length >= 5) {
      toast.error(
        <>
          임시저장은 최대 5개까지 가능합니다.
          <br />
          기존 목록을 삭제 혹은 불러와주세요.
        </>,
      );
    } else {
      await createDraft();
      closeModal();
    }
  };

  return (
    <Modal
      onRequestClose={closeWithoutSelection}
      isOpen={isOpen}
      style={customModalStyles}
      ariaHideApp={false}
    >
      <h1 className="relative flex justify-center border-b border-solid border-sub-color2 py-3 text-lg">
        임시저장 불러오기({classDraftList.length})
        <button
          className="absolute right-5 top-3.5"
          onClick={closeWithoutSelection}
        >
          <CloseSVG className="h-6 w-6 stroke-sub-color2" />
        </button>
      </h1>

      <DraftList
        classDraftList={classDraftList}
        closeModal={closeModal}
        deleteClassDraftList={deleteClassDraftList}
      />
    </Modal>
  );
};

export default DraftListModal;

interface DraftListProps {
  classDraftList: IGetClassDrafts[];
  closeModal: () => void;
  deleteClassDraftList: (deleteId: string) => Promise<void>;
}

const DraftList = ({
  classDraftList,
  closeModal,
  deleteClassDraftList,
}: DraftListProps) => {
  return (
    <ul className="flex flex-col gap-4 px-4 py-6">
      {classDraftList.map(({ id, updatedAt, title, step }) => {
        const date = new Date(updatedAt);
        const formattedDate = `${date.getFullYear()}.${
          date.getMonth() + 1
        }.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

        return (
          <li key={id} className="flex justify-between gap-2">
            <Link
              className=" w-2/3 cursor-pointer truncate"
              href={`/class/create?step=${step === null ? 0 : step}&id=${id}`}
            >
              {title === null ? '제목 없음' : title}
            </Link>

            <div className="flex gap-3">
              <data className="whitespace-nowrap text-sub-color2">
                {formattedDate}
              </data>
              <button onClick={() => deleteClassDraftList(id)}>
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
