'use client';
import { useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import Review from '@/components/Review/Review';
import UserReview from '@/components/Review/UserReview';
import { IUserReview } from '@/types/class';
import { StarSVG, ArrowUpSVG } from '@/icons/svg';

const filterOption = ['최신순', '좋아요순', '평점 높은순', '평점 낮은순'];

interface ClassReviewSectionProps {
  classTitle: string;
  reviewCount: number;
  stars: number;
  userReviews: IUserReview[];
}

const ClassReviewSection = ({
  classTitle,
  reviewCount,
  stars,
  userReviews,
}: ClassReviewSectionProps) => {
  const [isListOpened, setIsListOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');
  const modalRef = useRef(null);

  useClickAway(modalRef, () => {
    setIsListOpened(false);
  });

  const openList = () => {
    setIsListOpened(!isListOpened);
  };

  const onClickList = (listValue: string) => {
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
          클래스 후기 {reviewCount}건
          <div className="ml-3 hidden md:block">
            <Review average={stars} />
          </div>
          <StarSVG
            width="15"
            height="14"
            className="ml-3 fill-sub-color1 sm:block md:hidden"
          />
          <span className="ml-1 text-sub-color2">({stars})</span>
        </h2>

        <button
          onClick={openList}
          className="flex items-center gap-4 text-sm font-medium"
        >
          {selectedOption}
          <ArrowUpSVG
            width="27"
            height="27"
            className="origin-center rotate-180 fill-black"
          />
        </button>
        <ul
          className={`${
            isListOpened ? 'flex flex-col' : 'hidden'
          } absolute right-0 top-8 cursor-pointer divide-y divide-solid divide-sub-color4 border border-solid border-black bg-white text-sm font-medium text-[#969696]`}
        >
          {filterOption.map((list: string) => (
            <li
              key={list}
              className={`flex h-7 items-center gap-2 px-2 hover:bg-[#F5F5F5] ${
                selectedOption === list && 'text-black'
              }`}
              onClick={() => onClickList(list)}
            >
              {list}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-6">
        {userReviews.map((review) => (
          <UserReview
            key={review.id}
            src={review.users.userProfileImage}
            nickname={review.users.nickname}
            average={review.stars}
            content={review.description}
            date="23.07.11"
            title={classTitle}
          />
        ))}
      </div>
    </section>
  );
};

export default ClassReviewSection;
