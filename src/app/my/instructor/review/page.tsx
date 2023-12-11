import { getMyLecturersReviews } from '@/lib/apis/serverApis/reviewApis';
import MyReview from './_components/MyReview';
import { GetMyLecturersReviewsData } from '@/types/review';

const page = async () => {
  const firstRender = {
    take: 10000,
    lecturerMyReviewType: '전체',
  };

  let resReview: GetMyLecturersReviewsData = { review: [] };

  try {
    const response = await getMyLecturersReviews(firstRender);
    if (Array.isArray(response.review)) {
      resReview = response;
    }
  } catch (error) {
    console.error(error);
  }

  return <MyReview reviewList={resReview.review} />;
};

export default page;
