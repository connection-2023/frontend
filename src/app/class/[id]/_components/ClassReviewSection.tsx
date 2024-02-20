'use client';
import dynamic from 'next/dynamic';
import { useState, useRef, useEffect } from 'react';
import { useClickAway } from 'react-use';
import { StarSVG, ArrowUpSVG } from '@/icons/svg';
import { getClassReviews } from '@/lib/apis/classApis';
import { formatShortDate } from '@/utils/dateTimeUtils';
import Review from '@/components/Review/Review';
import UserReview from '@/components/Review/UserReview';
import { IUserReview, ReviewOrderType } from '@/types/class';

const SortDropdown = dynamic(
  () => import('@/components/Dropdown/SortDropdown'),
);
interface ClassReviewSectionProps {
  id: string;
  stars: number;
}

const ClassReviewSection = ({ id, stars }: ClassReviewSectionProps) => {
  const [isListOpened, setIsListOpened] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<ReviewOrderType>('최신순');
  const [userReviews, setUserReviews] = useState<IUserReview[]>([]);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getClassReviews(id, selectedOption);
      if (data instanceof Error) {
        return;
      }

      setUserReviews(data);
    };

    fetchData();
  }, [selectedOption]);

  useClickAway(modalRef, () => {
    setIsListOpened(false);
  });

  const openList = () => {
    setIsListOpened(!isListOpened);
  };

  const onClickList = (listValue: ReviewOrderType) => {
    setSelectedOption(listValue);
    setIsListOpened(false);
  };

  return (
    <section
      id="review-section"
      ref={modalRef}
      className="relative mb-20 scroll-mt-16"
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <h2 className="flex items-center scroll-smooth text-lg font-bold">
          클래스 후기 {userReviews.length}건
          <div className="ml-3 hidden md:block">
            <Review average={stars} />
          </div>
          <StarSVG
            width="15"
            height="14"
            className="ml-3 fill-sub-color1 sm:block md:hidden"
          />
          <span className="ml-1 text-gray-500">({stars})</span>
        </h2>

        <button
          onClick={openList}
          className="flex items-center gap-4 text-sm font-medium"
          aria-label="리뷰 정렬"
        >
          {selectedOption}
          <ArrowUpSVG
            width="27"
            height="27"
            className={`origin-center fill-black ${
              isListOpened ? '' : 'rotate-180'
            }`}
          />
        </button>
        {isListOpened && (
          <SortDropdown
            selectedOption={selectedOption}
            onClickList={onClickList}
          />
        )}
      </div>
      <div className="flex flex-col gap-6">
        {userReviews.map((review) => (
          <UserReview
            key={review.id}
            reviewId={review.id}
            src={review.user.userProfileImage}
            nickname={review.user.nickname}
            average={review.stars}
            content={review.description}
            date={formatShortDate(review.startDateTime)}
            title={review.lectureTitle}
            isLike={review.isLike}
            count={review.count}
            link={`/report?lectureReviewId=${review.id}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ClassReviewSection;
