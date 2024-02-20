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

  return <ClassCreateContainer currentStep={Number(step)} id={id} />;
};

export default page;
