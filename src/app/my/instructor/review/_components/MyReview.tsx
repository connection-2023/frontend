'use client';
import { useState } from 'react';
import { getMyLecturersReviews } from '@/lib/apis/reviewApis';
import usePageNation from '@/utils/usePagenation';
import Pagination from '@/components/Pagination/Pagination';
import { GetMyLecturersReviews, MyLecturersReviewsData } from '@/types/review';

const MyReview = ({ reviewList }: { reviewList: MyLecturersReviewsData[] }) => {
  const [reviews, setReviews] = useState(
    reviewList.length > 2 ? reviewList.slice(0, 2) : reviewList,
  );

  const changeReviews = (reviews: MyLecturersReviewsData[]) => {
    setReviews(reviews);
  };

  const { filterState, handleChangePage } = usePageNation({
    defaultFilterState: {
      take: 2,
      currentPage: 1,
      targetPage: 1,
      lecturerMyReviewType: '전체',
    },
    pageIndex: 1,
    itemList: reviews,
    changeItemListFn: changeReviews,
    getItemListFn: (data: GetMyLecturersReviews) => getMyLecturersReviews(data),
  });

  return (
    <main className="z-0 col-span-2 flex w-full flex-col ">
      {reviews.map(({ id }) => (
        <div key={id}>{id}</div>
      ))}
      <nav className="my-8 hidden sm:block">
        <Pagination
          pageCount={Math.ceil(reviewList.length / 2)}
          currentPage={
            filterState.targetPage !== undefined && filterState.targetPage > 0
              ? filterState.targetPage - 1
              : 0
          }
          onPageChange={handleChangePage}
        />
      </nav>
    </main>
  );
};

export default MyReview;

{
  /* <div className="flex flex-col-reverse gap-5 sm:flex-row">
        <section className="flex-grow">
          <h1>리뷰 관리</h1>
        </section>
        <section className="w-full self-start sm:w-56 md:w-72 lg:w-80">
           <ReviewStatistics />
          sadasdasdad
        </section>
      </div> */
}
