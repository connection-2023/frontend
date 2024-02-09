import { redirect } from 'next/navigation';
import { getClassDrafts } from '@/lib/apis/serverApis/classApi';
import DraftList from './_components/DraftList';
import { IGetClassDrafts } from '@/types/class';

const page = async () => {
  let classDrafts: IGetClassDrafts[] = [];

  try {
    const classDraftList = await getClassDrafts();

    classDrafts = classDraftList.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      redirect('/error');
    }
  }

  return (
    <main className="flex justify-center py-4">
      <section className="w-[40rem]">
        <DraftList classDrafts={classDrafts} />
      </section>
    </main>
  );
};

export default page;
