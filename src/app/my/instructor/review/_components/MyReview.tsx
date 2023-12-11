import { MyLecturersReviewsData } from '@/types/review';

const MyReview = ({ reviewList }: { reviewList: MyLecturersReviewsData[] }) => {
  console.log(reviewList);
  return (
    <main className="z-0 col-span-2 flex w-full flex-col ">
      <div className="flex flex-col-reverse gap-5 sm:flex-row">
        <section className="flex-grow">
          <h1>리뷰 관리</h1>
        </section>
        <section className="w-full self-start sm:w-56 md:w-72 lg:w-80">
          {/* <ReviewStatistics /> */}
          sadasdasdad
        </section>
      </div>
    </main>
  );
};

export default MyReview;
