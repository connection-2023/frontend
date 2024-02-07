'use client';
import Link from 'next/link';
import { TrashcanSVG } from '@/icons/svg';
import { deleteClassDrafts } from '@/lib/apis/classApi';
import { formatDateTimeNoSec } from '@/utils/dateTimeUtils';
import Modal from '@/components/Modal/Modal';
import { IGetClassDrafts } from '@/types/class';

interface IDraftListModal {
  draftModalView: boolean;
  closeDraftsModal: () => void;
  classDrafts: IGetClassDrafts[];
  changeDraftList: (draftList: IGetClassDrafts[]) => void;
}

const DraftListModal = ({
  classDrafts,
  draftModalView,
  closeDraftsModal,
  changeDraftList,
}: IDraftListModal) => {
  const deleteClassDraftList = async (deleteId: string) => {
    await deleteClassDrafts(deleteId);

    if (classDrafts && classDrafts.length - 1 === 0) {
      closeDraftsModal();
    }

    const draftsList = classDrafts.filter(({ id }) => deleteId !== id);

    changeDraftList(draftsList);
  };

  return (
    <Modal
      handleClosed={closeDraftsModal}
      isOpened={draftModalView}
      modalHistroryControl={false}
    >
      <section className="w-[40rem]">
        <h1 className="flex justify-center border-b border-solid border-gray-700 py-3 text-lg">
          임시저장 불러오기({classDrafts.length})
        </h1>

        <DraftList
          classDraftList={classDrafts}
          deleteClassDraftList={deleteClassDraftList}
        />
      </section>
    </Modal>
  );
};

export default DraftListModal;

interface DraftListProps {
  classDraftList: IGetClassDrafts[];
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
