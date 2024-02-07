import { redirect } from 'next/navigation';
import { getClassDrafts, getClassDraft } from '@/lib/apis/serverApis/classApi';
import ClassCreate from './_components/ClassCreate';
import ClassStoreInitializer from './_components/ClassStoreInitializer';

const validateSearchParams = (searchParams: {
  [key: string]: string | undefined;
}) => {
  if (isNaN(Number(searchParams.id)) || isNaN(Number(searchParams.step))) {
    throw new Error('id 혹은 step 숫자가 아닙니다.');
  }

  if (Number(searchParams.step) > 4 || Number(searchParams.step) < 0) {
    throw new Error('step이 비 정상적입니다.');
  }
};

const handleServerError = (error: unknown, redirectPath: string): void => {
  if (error instanceof Error) {
    console.error(error.message);
    redirect(redirectPath);
  }
};

const ClassCreatePage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  let data, classDrafts;

  if (searchParams && searchParams.id && searchParams.step) {
    try {
      validateSearchParams(searchParams);
      data = await getClassDraft(searchParams.id);
    } catch (error) {
      handleServerError(error, '/class/create');
    }
  } else {
    try {
      classDrafts = await getClassDrafts();
    } catch (error) {
      handleServerError(error, '/error');
    }
  }

  return (
    <>
      <ClassStoreInitializer data={data} />
      <ClassCreate step={searchParams?.step} classDrafts={classDrafts} />
    </>
  );
};

export default ClassCreatePage;
