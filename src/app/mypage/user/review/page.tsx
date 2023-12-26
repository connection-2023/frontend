import {
  getReservationDetails,
  getWriteReviews,
} from '@/lib/apis/serverApis/reviewApis';
import MyReview from './_components/MyReview';
import { ReservationDetails, WriteReview } from '@/types/review';

const page = async () => {
  let writeReviews: WriteReview[] = [];
  let reservationLists: ReservationDetails[] = [];

  try {
    const [geyWriteReviews, getReservationLists] = await Promise.all([
      getWriteReviews('최신순'),
      getReservationDetails(),
    ]);

    writeReviews = geyWriteReviews;
    reservationLists = getReservationLists;
  } catch (error) {
    console.error(error);
  }

  return <MyReview writeReviews={writeReviews} classLists={reservationLists} />;
};

export default page;
