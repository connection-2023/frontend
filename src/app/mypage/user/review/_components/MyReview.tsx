'use client';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { EditSVG, NotFoundSVG } from '@/icons/svg';
import { getWriteReviews } from '@/lib/apis/reviewApis';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import formatDate from '@/utils/formatDate';
import Button from '@/components/Button/Button';
import ReviewStatistics from '@/components/Review/ReviewStatistics';
import UserReview from '@/components/Review/UserReview';
import { userProfile } from '@/types/auth';
import { ReservationDetails, WriteReview } from '@/types/review';
import { FetchError } from '@/types/types';

interface ReviewProps {
  writeReviews: WriteReview[];
  classLists: ReservationDetails[];
}

const MyReview = ({ writeReviews, classLists }: ReviewProps) => {
  const [reviewList, setReviewList] = useState(writeReviews);
  const userStoreState = useUserStore();

  const profile = (userStoreState.authUser as userProfile)?.userProfileImage
    ?.imageUrl;
  const nickname = (userStoreState.authUser as userProfile)?.nickname;

  const filterChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    try {
      const writeReviews = await getWriteReviews(e.target.value);
      setReviewList(writeReviews);
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await getWriteReviews(e.target.value);
          } catch (error) {
            console.error(error);
          }
        } else {
          toast.error('잘못된 요청입니다!');
        }
      }
    }
  };

  return (
    <section className="z-0 col-span-1 flex w-full flex-col px-2 sm:px-6">
      <h1 className="col-span-2 mb-4 h-auto border-b border-solid border-gray-700 pb-4 text-center text-lg font-semibold sm:mb-0 sm:border-none sm:pb-0 sm:text-start sm:text-2xl sm:font-bold">
        작성한 리뷰
      </h1>
      <div className="flex flex-col-reverse gap-5 sm:flex-row">
        <div className="flex-grow sm:border-t sm:border-solid sm:border-gray-700">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3 whitespace-nowrap py-3">
              <select
                name="sorting"
                className="h-7 border border-solid border-gray-500"
                onChange={filterChange}
              >
                <option value="최신순">최신순</option>
                <option value="좋아요순">좋아요순</option>
                <option value="평점 높은순">평점 높은순</option>
                <option value="평점 낮은순">평점 낮은순</option>
              </select>
              {writeReviews.length}개의 리뷰
            </div>
            <Link href="/mypage/user/review/writeReviewModal">
              <Button>
                <div className="flex items-center gap-1 whitespace-nowrap px-2 text-sm sm:px-4 sm:text-base">
                  <EditSVG
                    width="15px"
                    height="15px"
                    className="fill-sub-color1"
                  />
                  <span className="hidden sm:block">리뷰 작성하기</span>
                  <span className="block sm:hidden">리뷰 작성</span>(
                  {classLists.length})
                </div>
              </Button>
            </Link>
          </nav>
          {reviewList.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {reviewList.map(({ id, stars, lecture, _count, description }) => (
                <UserReview
                  key={id}
                  src={profile}
                  nickname={nickname}
                  average={stars}
                  date={formatDate(lecture.startDate)}
                  title={lecture.title}
                  count={_count.likedLectureReview}
                  isLike={true} //백엔드 api isLike 받을 예정
                  reviewId={id}
                  content={description}
                  link={`/report?lectureReviewId=${id}`}
                />
              ))}
            </ul>
          ) : (
            <div className="my-7 flex w-full flex-col items-center justify-center gap-8 text-lg font-semibold text-gray-100">
              <NotFoundSVG />
              <p>작성 하신 리뷰가 없습니다!</p>
            </div>
          )}
        </div>
        <div className="w-full self-start sm:w-56 md:w-72 lg:w-80">
          <ReviewStatistics reviewList={writeReviews} />
        </div>
      </div>
    </section>
  );
};

export default MyReview;
