import BestInstructors from '@/app/instructor/_components/BestInstructors';
import { dummyMain } from '@/constants/dummy';

const instructorPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  return <BestInstructors list={dummyMain.topInstructorList} />;
};

export default instructorPage;
