import { redirect } from 'next/navigation';
import {
  getClassDrafts,
  createClassDraft,
  getClassDraft,
} from '@/lib/apis/serverApis/classApi';
import ClassStoreInitializer from './_components/ClassStoreInitializer';
import DraftListModalContainer from './_components/DraftListModalContainer';
import ClassCreate from './ClassCreate';

const ClassCreateServerPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  let data, classDrafts;

  if (searchParams && searchParams.id && searchParams.step) {
    try {
      if (isNaN(Number(searchParams.id)) || isNaN(Number(searchParams.step))) {
        throw new Error('id 혹은 step 숫자가 아닙니다.');
      }

      data = await getClassDraft(searchParams.id);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        redirect('/class/create');
      }
    }
  } else {
    classDrafts = await getClassDrafts();
    if (classDrafts.length === 0) {
      const { id } = await createClassDraft();
      redirect(`/class/create?step=0&id=${id}`);
    }
  }

  return (
    <>
      <ClassStoreInitializer data={data} />
      {!searchParams ||
        ((!searchParams.id || !searchParams.step) && classDrafts.length > 0 && (
          <DraftListModalContainer classDrafts={classDrafts} />
        ))}
      <ClassCreate />
    </>
  );
};

export default ClassCreateServerPage;
