'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from 'next/navigation';
import { useState, useRef, Fragment } from 'react';
import { useClickAway } from 'react-use';
import {
  DEFAULT_REVIEW_COUNT,
  FETCH_REVIEW_COUNT,
} from '@/constants/constants';
import { StarSVG, ArrowUpSVG } from '@/icons/svg';
import { getClassReviews, getInstructorReviews } from '@/lib/apis/reviewApis';
import { formatShortDate } from '@/utils/dateTimeUtils';
import SortDropdown from '@/components/Dropdown/SortDropdown';
import { Review, UserReview } from '@/components/Review';
import Spinner from '@/components/Spinner/Spinner';
import { ReviewOrderType } from '@/types/review';

interface ReviewSectionProps {
  stars: number;
  type: 'class' | 'instructor';
}

const ReviewSection = (props: ReviewSectionProps) => {
  const { stars, type } = props;
  const { id } = useParams<{ id: string }>();
  const [isListOpened, setIsListOpened] = useState(false);

  const modalRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || '최신순';
  const page = Number(searchParams.get('page') || 0);
  const firstId = Number(searchParams.get('firstId') || 0);
  const lastId = Number(searchParams.get('lastId') || 0);
  const nextQueryRef = useRef({
    sort,
    page,
    firstId,
    lastId,
  });

  const selectedOption = decodeURIComponent(
    sort || '최신순',
  ) as ReviewOrderType;

  const fetchReviewList = async () => {
    const prevQuery = {
      sort,
      page,
      firstId,
      lastId,
    };

    const reviewCount = page ? DEFAULT_REVIEW_COUNT : FETCH_REVIEW_COUNT;

    const fetchReviews = async (type: 'class' | 'instructor') => {
      return await (type === 'class' ? getClassReviews : getInstructorReviews)(
        id,
        reviewCount,
        page,
        page + 1,
        firstId,
        lastId,
        selectedOption,
      );
    };

    const reviews = await fetchReviews(type);

    if (reviews.totalItemCount) {
      const nextQuery = {
        ...prevQuery,
        page: page + 1,
        firstId: reviews.reviews[0].id,
        lastId: reviews.reviews[reviews.reviews.length - 1].id,
      };

      nextQueryRef.current = nextQuery;
    }

    handleSearchParams(prevQuery);

    return reviews;
  };

  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [type, id, selectedOption],
      queryFn: fetchReviewList,
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        const totalReviewsCount = pages.reduce(
          (acc, item) => acc + item.reviews.length,
          0,
        );
        if (totalReviewsCount < lastPage.totalItemCount) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  useClickAway(modalRef, () => {
    setIsListOpened(false);
  });

  const onClickList = (listValue: ReviewOrderType) => {
    const queryObj = {
      sort: listValue,
      page: 0,
      firstId: 0,
      lastId: 0,
    };

    handleSearchParams(queryObj);
    setIsListOpened(false);
  };

  const handleSearchParams = (params: { [key: string]: string | number }) => {
    const currentParams = new URLSearchParams(window.location.search);
    for (const key in params) {
      currentParams.set(key, String(params[key]));
    }
    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <section
      id="review-section"
      ref={modalRef}
      className="relative mb-20 w-full scroll-mt-16"
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <h2 className="flex items-center scroll-smooth text-lg font-bold">
          {type === 'class' ? '클래스' : '강사'} 후기{' '}
          {data?.pages[0].totalItemCount || 0}건
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
          onClick={() => setIsListOpened((prev) => !prev)}
          className="flex items-center gap-2 text-sm font-medium"
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

      <div className="mb-3.5 flex min-h-20 flex-col gap-6">
        {isFetching || !data ? (
          <div className="flex h-20 w-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          data.pages.map((page, i) => (
            <Fragment key={i}>
              {page.reviews.map((review) => (
                <UserReview
                  key={review.id}
                  reviewId={review.id}
                  src={review.user.profileImage}
                  nickname={review.user.nickname}
                  average={review.stars}
                  content={review.description}
                  date={formatShortDate(review.startDateTime)}
                  title={review.lectureTitle}
                  isLike={review.isLike}
                  count={review.likeCount}
                  link={`/report?lectureReviewId=${review.id}`}
                />
              ))}
            </Fragment>
          ))
        )}
      </div>

      {hasNextPage && !isFetchingNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="mx-auto flex gap-x-1.5 text-gray-500"
        >
          더보기
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-solid border-gray-500 pb-0.5 text-xl font-semibold text-sub-color1">
            +
          </div>
        </button>
      )}
    </section>
  );
};

export default ReviewSection;
