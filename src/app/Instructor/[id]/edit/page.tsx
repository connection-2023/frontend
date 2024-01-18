import { redirect } from 'next/navigation';
import { getInstructor } from '@/lib/apis/serverApis/instructorPostApis';
import { useUserStore } from '@/store';
import EditInstructor from './_components/EditInstructor';

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const { authUser } = useUserStore.getState();

  if (Number(authUser?.id) !== Number(id)) {
    // redirect('/404');
  }

  try {
    const data = await getInstructor(id, false);
    console.log(data);
  } catch (error) {}

  return <EditInstructor />;
};

export default page;
