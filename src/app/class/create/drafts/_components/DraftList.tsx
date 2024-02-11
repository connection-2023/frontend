'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { TrashcanSVG } from '@/icons/svg';
import { createClassDraft, deleteClassDrafts } from '@/lib/apis/classApi';
import { formatDateTimeNoSec } from '@/utils/dateTimeUtils';
import Button from '@/components/Button/Button';
import { IGetClassDrafts } from '@/types/class';

interface DraftListProps {
  classDrafts: IGetClassDrafts[];
}

const DraftList = ({ classDrafts }: DraftListProps) => {
  const router = useRouter();
  const [classDraftList, setClassDraftList] = useState(classDrafts);

  const createClassDraftHandler = async () => {
    if (classDraftList.length + 1 > 5) {
      return toast.error(
        `임시저장은 최대 5개까지 가능 합니다. 불러오기 혹은 삭제 후 진행해주세요.`,
      );
    }

    try {
      const { id } = await createClassDraft();

      router.push(`/class/create/${id}?step=0`);
    } catch (error) {
      toast.error('새로 고침 후 다시 시도해 주세요.');
    }
  };

  const deleteClassDraft = async (deleteId: string, title: string | null) => {
    if (
      !confirm(
        `${title ? `'${title}'` : ''} 해당 임시저장된 정보를 제거하시겠습니까?`,
      )
    ) {
      return;
    }

    try {
      await deleteClassDrafts(deleteId);

      const draftsList = classDraftList.filter(({ id }) => deleteId !== id);

      setClassDraftList(draftsList);

      // if (draftsList.length === 0) {
      //   await createClassDraftHandler();
      // }

      toast.success('임시저장 삭제 성공');
    } catch (error) {
      toast.error('새로 고침 후 다시 시도해 주세요.');
    }
  };

  return (
    <>
      <header className="relative my-3 flex h-14 justify-center sm:h-auto">
        <h1 className="text-lg font-bold sm:text-2xl">임시저장 불러오기</h1>
        <span className="absolute bottom-0 right-3 text-sm sm:right-0 sm:text-base">
          총 {classDraftList.length}개 (최대 5개)
        </span>
      </header>
      <hr className="border-black" />
      <ul className="mb-4 flex flex-col">
        {classDraftList.map(({ id, updatedAt, title, step }) => {
          const formattedDate = formatDateTimeNoSec(updatedAt);
          return (
            <li key={id} className="relative">
              <div className="h-[4.56rem] border-b border-solid border-gray-500 hover:bg-sub-color1-transparent">
                <Link
                  href={`/class/create/${id}?step=${step === null ? 0 : step}`}
                >
                  <dl className="flex h-full flex-col justify-center px-3">
                    <dt className="w-11/12 truncate text-lg font-bold">
                      {title === null ? '제목 없음' : title}
                    </dt>
                    <dd className="text-sm">{formattedDate}</dd>
                  </dl>
                </Link>
              </div>
              <button
                onClick={() => deleteClassDraft(id, title)}
                className="group absolute right-3 top-1/2 -translate-y-1/2"
              >
                <TrashcanSVG className="h-6 w-6 stroke-gray-500 group-hover:stroke-sub-color1" />
              </button>
            </li>
          );
        })}
      </ul>
      <Button onClick={createClassDraftHandler} color="secondary">
        새로 작성하기
      </Button>
    </>
  );
};

export default DraftList;
