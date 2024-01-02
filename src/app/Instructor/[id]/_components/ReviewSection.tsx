'use client';
import { parseISO, format } from 'date-fns';
import { useState, useRef, useEffect } from 'react';
import { useClickAway } from 'react-use';
import SortDropdown from '@/components/Dropdown/SortDropdown';
import Review from '@/components/Review/Review';
import UserReview from '@/components/Review/UserReview';
import { ReviewOrderType } from '@/types/class';
import { IInstructorReviewList } from '@/types/instructor';
import { StarSVG, ArrowUpSVG } from '@/icons/svg';
import { getReviews } from '@/lib/apis/instructorPostApis';

interface ReviewSectionProps {
  id: string;
  stars: number;
  totalReviewCount: number;
}

const ReviewSection = ({ id, stars, totalReviewCount }: ReviewSectionProps) => {
  const [isListOpened, setIsListOpened] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<ReviewOrderType>('최신순');
  const [userReviews, setUserReviews] = useState<IInstructorReviewList[]>([]);
  const modalRef = useRef(null);
  // 페이지네이션 처리 구현 예정
  const [displayCount, setDisplayCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemId, setItemId] = useState({
    firstItemId: 0,
    lastItemId: 0,
  });

  const fetchData = async (
    displayCount: number,
    currentPage: number,
    targetPage: number,
    firstItemId: number,
    lastItemId: number,
    option: string,
  ) => {
    const data = await getReviews(
      id,
      displayCount,
      currentPage,
      targetPage,
      firstItemId,
      lastItemId,
      option,
    );
    if (data instanceof Error) {
      return;
    }
    setUserReviews(data?.review ?? []);
  };

  useEffect(() => {
    fetchData(
      displayCount,
      currentPage,
      currentPage,
      itemId.firstItemId,
      itemId.lastItemId,
      selectedOption,
    );
  }, [selectedOption]);

  useClickAway(modalRef, () => {
    setIsListOpened(false);
  });

  if (!userReviews) return null;
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
      className="relative mb-20 mt-14 w-full max-w-[51.1rem] scroll-mt-16"
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="flex items-center scroll-smooth text-lg font-bold">
          <h2> 강사 리뷰 {totalReviewCount}건</h2>
          <div className="ml-3 hidden md:block">
            <Review average={stars} />
          </div>
          <StarSVG
            width="15"
            height="14"
            className="ml-3 fill-sub-color1 sm:block md:hidden"
          />
          <span className="ml-1 text-gray-500">({stars})</span>
        </div>

        <button
          onClick={openList}
          className="flex items-center gap-4 text-sm font-medium"
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
            src={review.users.userProfileImage.imageUrl}
            nickname={review.users.nickname}
            average={review.stars}
            content={review.description}
            date={format(
              parseISO(review.reservation.lectureSchedule.startDateTime),
              'yy.MM.dd',
            )}
            title={review.reservation.lectureSchedule.lecture.title}
            isLike={review.likedLectureReview?.[0] ? true : false}
            count={review._count.likedLectureReview}
            link={`/report?lectureReviewId=${review.id}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
