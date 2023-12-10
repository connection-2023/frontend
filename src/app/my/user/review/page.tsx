import {
  getReservationDetails,
  getWriteReviews,
} from '@/lib/apis/serverApis/reviewApis';
import MyReview from './_components/MyReview';

const page = async () => {
  const [writeReviews, reservationLists] = await Promise.all([
    getWriteReviews('최신순'),
    getReservationDetails(),
  ]);

  return <MyReview writeReviews={writeReviews} classLists={reservationLists} />;
};

export default page;
