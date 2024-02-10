import { redirect } from 'next/navigation';
import ClassCreateContainer from './_components/ClassCreateContainer';

const page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | undefined };
}) => {
  const id = params.id;
  const step = searchParams?.step;

  try {
    if (!step) {
      throw new Error('step undefind');
    }

    if (
      !Number.isInteger(Number(step)) ||
      Number(step) > 4 ||
      Number(step) < 0
    ) {
      throw new Error('step error');
    }
  } catch (error) {
    redirect('/class/create/drafts');
  }

  return (
    <main className="mx-auto max-w-[1440px] px-[2.38rem]">
      <h1 className="my-4 flex w-full justify-center text-2xl font-bold">
        클래스 작성
      </h1>
      <ClassCreateContainer currentStep={Number(step)} id={id} />
    </main>
  );
};

export default page;
