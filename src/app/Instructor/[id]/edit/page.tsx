import { redirect } from 'next/navigation';
import { getInstructor } from '@/lib/apis/serverApis/instructorPostApis';
import { useUserStore } from '@/store';
import { categorizeGenres, resRegions } from '@/utils/apiDataProcessor';
import EditInstructor from './_components/EditInstructor';

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const { authUser } = useUserStore.getState();

  if (Number(authUser?.id) !== Number(id)) {
    // redirect('/404');
  }

  let processData;

  try {
    const data = await getInstructor(id, false);
    const { newGenres, etcGenres } = categorizeGenres(
      data?.lecturerDanceGenre.map(
        ({ danceCategory }) => danceCategory.genre,
      ) ?? [],
    );

    processData = {
      img: data?.lecturerProfileImageUrl.map(({ url }) => ({
        imageUrl: url,
      })),
      region: resRegions(data?.lecturerRegion.map(({ region }) => region)),
      genre: [...newGenres, ...etcGenres],
      ...data,
    };
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="mx-auto mb-28 flex w-full max-w-[40rem] flex-col items-center px-5">
      <EditInstructor defaultData={processData} />
    </main>
  );
};

export default page;
