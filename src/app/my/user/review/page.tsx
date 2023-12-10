import { getWriteReviews } from '@/lib/apis/serverApis/reviewApis';
import Review from './_components/MyReview';

const page = async () => {
  const writeReviews = await getWriteReviews('최신순');

  return <Review writeReviews={writeReviews} />;
};

export default page;
