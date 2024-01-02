import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ReviewSVG, ArrowUpSVG } from '@/icons/svg';
import { getMyLecturersReviews } from '@/lib/apis/reviewApis';
import ProfileImg from '@/components/ProfileImage/ProfileImage';
import Review from '@/components/Review/Review';
import { MyLecturersReviewsData } from '@/types/review';

const RecentReview = () => {
  const [reviewData, setReviewData] = useState<MyLecturersReviewsData[]>();

  useEffect(() => {
    const fetchData = async () => {
      const reviewData = await getMyLecturersReviews({
        take: 5,
        lecturerMyReviewType: '전체',
        orderBy: '최신순',
      });
      setReviewData(reviewData.item);
    };
    fetchData();
  }, []);

  return (
    <section className="flex h-fit flex-col divide-y divide-solid divide-gray-700 rounded-lg bg-white shadow-float">
      <h1 className="flex h-12 w-full items-center justify-between px-3.5 text-base font-bold text-gray-100">
        <span className="flex items-center gap-1.5">
          <ReviewSVG width="22" height="22" className="fill-sub-color1" />
          클래스 리뷰
        </span>

        <Link
          href="/mypage/instructor/review"
          className="group flex cursor-pointer items-center text-sm font-medium text-gray-500 hover:text-black"
        >
          더 보러가기
          <ArrowUpSVG
            width="24"
            height="24"
            className="rotate-90 fill-gray-500 group-[:hover]:fill-black"
          />
        </Link>
      </h1>
      <ul className="divide-y divide-solid divide-gray-700">
        {reviewData?.map((data, index) => (
          <li
            key={data.id}
            className={`h-[7.31rem] flex-col justify-center px-3.5 text-sm ${
              index > 2 ? 'hidden xl:flex' : 'flex'
            }`}
          >
            <div className="mb-3.5 flex items-center gap-1.5">
              <ProfileImg
                size="small"
                src={data.users.userProfileImage.imageUrl}
                label={false}
              />

              <div className="flex flex-col gap-1">
                <div className="flex gap-1.5 whitespace-nowrap text-sm">
                  {data.users.nickname}
                  <Link
                    href={`/class/${data.lectureId}`}
                    className="line-clamp-1 text-gray-500 hover:underline"
                  >
                    {data.reservation.lectureSchedule.lecture.title}
                  </Link>
                </div>
                <Review average={data.stars} />
              </div>
            </div>
            <p className="line-clamp-2 w-full text-sm font-normal leading-5">
              {data.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecentReview;
