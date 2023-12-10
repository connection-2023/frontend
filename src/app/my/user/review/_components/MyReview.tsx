'use client';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { EditSVG } from '@/icons/svg';
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
    <section className="z-0 col-span-2 flex w-full flex-col ">
      <h1 className="col-span-2 h-auto text-2xl font-bold">작성한 리뷰</h1>
      <section className="flex gap-5">
        <div className="flex-grow border-t border-solid border-gray-700">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3 py-3">
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
            <Link href="/my/user/review/writeReviewModal">
              <Button>
                <div className="flex items-center gap-1 px-4">
                  <EditSVG
                    width="15px"
                    height="15px"
                    className="fill-sub-color1"
                  />
                  리뷰 작성하기({classLists.length})
                </div>
              </Button>
            </Link>
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
