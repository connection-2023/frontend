'use client';
import { useState } from 'react';
import { useUserStore } from '@/store';
import formatDate from '@/utils/formatDate';
import Button from '@/components/Button/Button';
import ReviewStatistics from '@/components/Review/ReviewStatistics';
import UserReview from '@/components/Review/UserReview';
import { userProfile } from '@/types/auth';
import { WriteReview } from '@/types/review';

interface ReviewProps {
  writeReviews: WriteReview[];
}

const MyReview = ({ writeReviews }: ReviewProps) => {
  const [reviewList, setReviewList] = useState(writeReviews);
  const userStoreState = useUserStore();

  const profile = (userStoreState.authUser as userProfile)?.userProfileImage
    ?.imageUrl;
  const nickname = (userStoreState.authUser as userProfile)?.nickname;

  console.log(reviewList);

  return (
    <section className="z-0 col-span-2 flex w-full flex-col ">
      <h1 className="col-span-2 h-auto text-2xl font-bold">작성한 리뷰</h1>
      <section className="flex gap-5">
        <div className="flex-grow border-t border-solid border-gray-700">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3 py-3">
              <select
                name="sorting"
                className="h-7 border border-solid border-gray-500"
              >
                <option value="최신순">최신순</option>
                <option value="좋아요순">좋아요순</option>
                <option value="평점 높은순">평점 높은순</option>
                <option value="평점 낮은순">평점 낮은순</option>
              </select>
              {writeReviews.length}개의 리뷰
            </div>
            <div>
              <Button>리뷰 작성하기()</Button>
            </div>
          </nav>
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
              />
            ))}
          </ul>
        </div>
        <div className="w-80 self-start">
          <ReviewStatistics reviewList={writeReviews} />
        </div>
      </section>
    </section>
  );
};

export default MyReview;
