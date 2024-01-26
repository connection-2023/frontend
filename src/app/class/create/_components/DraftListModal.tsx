import Link from 'next/link';
import { toast } from 'react-toastify';
import { TrashcanSVG } from '@/icons/svg';
import { formatDateTimeNoSec } from '@/utils/dateTimeUtils';
import Modal from '@/components/Modal/Modal';
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
    <Modal handleClosed={closeWithoutSelection} isOpened={isOpen}>
      <section className="w-[40rem]">
        <h1 className="flex justify-center border-b border-solid border-gray-700 py-3 text-lg">
          임시저장 불러오기({classDraftList.length})
        </h1>

        <DraftList
          classDraftList={classDraftList}
          closeModal={closeModal}
          deleteClassDraftList={deleteClassDraftList}
        />
      </section>
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
  deleteClassDraftList,
}: DraftListProps) => {
  return (
    <ul className="flex flex-col gap-4 px-4 py-6">
      {classDraftList.map(({ id, updatedAt, title, step }) => {
        const formattedDate = formatDateTimeNoSec(updatedAt);
        return (
          <li key={id} className="flex justify-between gap-2">
            <Link
              className=" w-2/3 cursor-pointer truncate"
              href={`/class/create?step=${
                step === null ? 0 : step === 4 ? step : step + 1
              }&id=${id}`}
            >
              {title === null ? '제목 없음' : title}
            </Link>

            <div className="flex gap-3">
              <data className="whitespace-nowrap text-gray-300">
                {formattedDate}
              </data>
              <button onClick={() => deleteClassDraftList(id)}>
                <TrashcanSVG className="h-6 w-6 stroke-gray-500" />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
