import { redirect } from 'next/navigation';
import {
  createClassDraft,
  getClassDrafts,
} from '@/lib/apis/serverApis/classApi';
import DraftList from './_components/DraftList';
import { IGetClassDrafts } from '@/types/class';

const page = async () => {
  let classDrafts: IGetClassDrafts[] = [];
  let id;

  try {
    const classDraftList = await getClassDrafts();

    if (classDraftList.length === 0) {
      const { id: classDraftId } = await createClassDraft();
      id = classDraftId;
    }

    classDrafts = classDraftList.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      redirect('/error');
    }
  }

  if (id) {
    redirect(`/class/create/${id}?step=0`);
  }

  return (
    <main className="flex flex-1 justify-center py-4">
      <section className="w-[40rem]">
        <DraftList classDrafts={classDrafts} />
      </section>
    </main>
  );
};

export default page;
