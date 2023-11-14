'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClassDraft, deleteClassDrafts } from '@/lib/apis/classApi';
import DraftListModal from './DraftListModal';
import { IGetClassDrafts } from '@/types/class';

const DraftListModalContainer = ({
  classDrafts,
}: {
  classDrafts: IGetClassDrafts[];
}) => {
  const [classDraftList, setClassDraftList] =
    useState<IGetClassDrafts[]>(classDrafts);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

  const createDraft = async () => {
    const { id } = await createClassDraft();
    router.push(`/class/create?step=0&id=${id}`);
  };

  const closeDraftsModal = () => {
    setIsModalOpen(false);
  };

  const deleteClassDraftList = async (deleteId: string) => {
    await deleteClassDrafts(deleteId);

    setClassDraftList((prev) => {
      if (prev && prev.length - 1 === 0) {
        createDraft();
        closeDraftsModal();
      }

      return prev.filter(({ id }) => deleteId !== id);
    });
  };

  return (
    <DraftListModal
      isOpen={isModalOpen}
      closeModal={closeDraftsModal}
      classDraftList={classDraftList}
      createDraft={createDraft}
      deleteClassDraftList={deleteClassDraftList}
    />
  );
};

export default DraftListModalContainer;
