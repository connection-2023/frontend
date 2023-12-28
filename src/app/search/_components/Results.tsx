import { searchAll } from '@/lib/apis/serverApis/searchApis';
import { useUserStore } from '@/store/userStore';
import { searchClass } from '@/types/class';
import { searchInstructor } from '@/types/instructor';

const Results = async ({ query }: { query: string }) => {
  const userStoreState = useUserStore.getState();
  let instructorList: searchInstructor[] = [];
  let classList: searchClass[] = [];
  try {
    const { searchedLecturers, searchedLectures } = await searchAll(
      query,
      8,
      !!userStoreState.authUser,
    );

    instructorList = searchedLecturers;
    classList = searchedLectures;
  } catch (error) {
    console.error('쿠폰 조회 오류', error);
  }

  return <main>ads</main>;
};

export default Results;
