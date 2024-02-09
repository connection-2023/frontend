import { redirect } from 'next/navigation';
import { getClassDrafts, getClassDraft } from '@/lib/apis/serverApis/classApi';
import { classDraftsDataProcess } from '@/utils/apiDataProcessor';
import ClassCreate from './_components/ClassCreate';
import { IprocessedDraft } from '@/types/class';

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
      const resData = await getClassDraft(searchParams.id);
      data = classDraftsDataProcess(resData);

      if (
        searchParams?.step &&
        data.step &&
        data.step + 1 < Number(searchParams.step)
      ) {
        throw new Error('올바르지 않은 step 접근');
      }
    } catch (error) {
      handleServerError(error, '/class/create');
    }
  }

  // console.log(data);

  return (
    <ClassCreate
      data={data as IprocessedDraft | null}
      step={searchParams?.step}
      classDrafts={classDrafts ?? []}
    />
  );
};

export default ClassCreatePage;
