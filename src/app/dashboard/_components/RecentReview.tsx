import Link from 'next/link';
import { getMyLecturersReviews } from '@/lib/apis/serverApis/reviewApis';
import ProfileImg from '@/components/Profile/ProfileImage';
import { Review } from '@/components/Review';

const RecentReview = async () => {
  const { item: reviewData } = await getMyLecturersReviews({
    take: 5,
    lecturerMyReviewType: '전체',
    orderBy: '최신순',
  });

  return reviewData?.length ? (
    <ul className="divide-y divide-solid divide-gray-700">
      {reviewData.map((data, index) => (
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
  ) : (
    <p className="flex flex-1 items-center justify-center">
      클래스 리뷰가 없습니다.
    </p>
  );
};

export default RecentReview;
