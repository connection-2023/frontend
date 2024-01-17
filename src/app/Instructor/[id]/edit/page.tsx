import { redirect } from 'next/navigation';
import { getInstructor } from '@/lib/apis/serverApis/instructorPostApis';
import { useUserStore } from '@/store';

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const { authUser } = useUserStore.getState();

  if (Number(authUser?.id) !== Number(id)) {
    redirect('/404');
  }

  try {
    await getInstructor(id, false);
  } catch (error) {}

  return <section>aaa</section>;
};

export default page;
