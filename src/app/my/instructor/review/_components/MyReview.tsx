'use client';
import { Fragment, useState } from 'react';
import ClassFilterSelect from '@/app/my/[userType]/coupon-pass/_components/ClassFilterSelect';
import { NotFoundSVG } from '@/icons/svg';
import { getMyLecturersReviews } from '@/lib/apis/reviewApis';
import formatDate from '@/utils/formatDate';
import usePageNation from '@/utils/usePagenation';
import Pagination from '@/components/Pagination/Pagination';
import ReviewStatistics from '@/components/Review/ReviewStatistics';
import UserReview from '@/components/Review/UserReview';
import { OptionType } from '@/types/coupon';
import { GetMyLecturersReviews, MyLecturersReviewsData } from '@/types/review';

interface MyReview {
  reviewList: MyLecturersReviewsData[];
  myClassListsOption: OptionType[];
}

const MyReview = ({ reviewList, myClassListsOption }: MyReview) => {
  const [reviews, setReviews] = useState(
    reviewList.length > 2 ? reviewList.slice(0, 2) : reviewList,
  );

  const changeReviews = (reviews: MyLecturersReviewsData[]) => {
    setReviews(reviews);
  };

  const {
    filterState,
    handleChangePage,
    resetFilter,
    updateFilter,
    totalItemCount,
  } = usePageNation({
    defaultFilterState: {
      take: 2,
      currentPage: 1,
      targetPage: 1,
      lecturerMyReviewType: '전체',
      orderBy: '최신순',
      lectureId: myClassListsOption[0]?.value ?? undefined,
    },
    firstPageIndex: 1,
    itemList: reviews,
    totalItemCount: reviewList.length,
    changeItemListFn: changeReviews,
    getItemListFn: (data: GetMyLecturersReviews, signal: AbortSignal) =>
      getMyLecturersReviews(data, signal),
  });

  const options: {
    id: string;
    label: string;
  }[] = [
    {
      id: '전체',
      label: '전체',
    },
    {
      id: '진행중인 클래스',
      label: '진행중인 클래스',
    },
    {
      id: '종료된 클래스',
      label: '종료된 클래스',
    },
  ];

  return (
    <main className="col-span-2 flex w-full flex-col ">
      <div className="flex flex-col-reverse gap-5 sm:flex-row">
        <section className="flex flex-grow flex-col bg-white pt-5 shadow-vertical">
          <h1 className="px-5 pb-5 text-2xl font-bold">리뷰 관리</h1>
          <nav className="flex flex-wrap items-center gap-3 whitespace-nowrap border-b border-solid border-gray-500 px-5 pb-[1.38rem] lg:flex-nowrap">
            {options.map((option) => (
              <button
                key={option.id}
                className="flex items-center gap-1 text-sm"
              >
                <input
                  id={option.id}
                  type="checkbox"
                  className="peer h-[18px] w-[18px]  accent-black"
                  checked={filterState.lecturerMyReviewType === option.id}
                  onChange={() =>
                    resetFilter('lecturerMyReviewType', option.id)
                  }
                />
                <label
                  htmlFor={option.id}
                  className="cursor-pointer text-gray-500 peer-checked:text-black"
                >
                  {option.label}
                </label>
              </button>
            ))}
            <div className="w-72 lg:flex-grow">
              <ClassFilterSelect
                options={myClassListsOption}
                value={
                  myClassListsOption.find(
                    ({ value }) => value === filterState.lectureId,
                  ) ?? myClassListsOption[0]
                }
                onChange={(change: any) => {
                  resetFilter('lectureId', change.value);
                }}
                isDisabled={filterState.lecturerMyReviewType !== '전체'}
              />
            </div>
          </nav>
          <div className="flex flex-col py-5">
            <div className="flex items-center gap-5 pb-5 pl-5 text-sm">
              <select
                name="sorting"
                className="h-7 border border-solid border-gray-500"
                value={filterState.orderBy}
                onChange={(e) => updateFilter('orderBy', e.target.value)}
              >
                <option value="최신순">최신순</option>
                <option value="좋아요순">좋아요순</option>
                <option value="평점 높은순">평점 높은순</option>
                <option value="평점 낮은순">평점 낮은순</option>
              </select>
              {totalItemCount}개의 리뷰
            </div>
            {totalItemCount > 0 ? (
              <>
                <ul className="flex flex-col">
                  {reviews.map(
                    ({ id, stars, users, description, reservation }) => (
                      <Fragment key={id}>
                        <UserReview
                          src={users.userProfileImage.imageUrl}
                          nickname={users.nickname}
                          average={stars}
                          date={formatDate(
                            reservation.lectureSchedule.startDateTime,
                          )}
                          title={reservation.lectureSchedule.lecture.title}
                          count={3}
                          isLike={false}
                          reviewId={id}
                          content={description}
                          disabled={true}
                        />
                        <div className="h-1 bg-sub-color1-transparent" />
                      </Fragment>
                    ),
                  )}
                </ul>
                <nav className="z-10">
                  <Pagination
                    pageCount={Math.ceil(totalItemCount / 2)}
                    currentPage={
                      filterState.targetPage !== undefined &&
                      filterState.targetPage > 0
                        ? filterState.targetPage - 1
                        : 0
                    }
                    onPageChange={handleChangePage}
                  />
                </nav>
              </>
            ) : (
              <div className="my-7 flex w-full flex-col items-center justify-center gap-8 text-lg font-semibold text-gray-100">
                <NotFoundSVG />
                <p>작성 된 리뷰가 없습니다!</p>
              </div>
            )}
          </div>
        </section>
        <section className="w-full self-start sm:w-56 md:w-72 lg:w-80">
          <ReviewStatistics reviewList={reviewList} />
        </section>
      </div>
    </main>
  );
};

export default MyReview;
