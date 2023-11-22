import { redirect } from 'next/navigation';
import {
  getClassDrafts,
  createClassDraft,
  getClassDraft,
} from '@/lib/apis/serverApis/classApi';
import ClassCreate from './_components/ClassCreate';
import ClassStoreInitializer from './_components/ClassStoreInitializer';
import DraftListModalContainer from './_components/DraftListModalContainer';

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
      if (classDrafts.length === 0) {
        const { id } = await createClassDraft();
        redirect(`/class/create?step=0&id=${id}`);
      }
    } catch (error) {
      handleServerError(error, '/');
      // 추후 401이면 로그인으로 이동
    }
  }

  return (
    <>
      <ClassStoreInitializer data={data} />
      {!searchParams ||
        ((!searchParams.id || !searchParams.step) && classDrafts.length > 0 && (
          <DraftListModalContainer classDrafts={classDrafts} />
        ))}
      <ClassCreate step={searchParams?.step} />
    </>
  );
};

export default ClassCreatePage;
