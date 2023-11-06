import Link from 'next/link';
import { ReviewSVG, ArrowUpSVG } from '@/icons/svg';
import ProfileImg from '@/components/ProfileImage/ProfileImage';
import Review from '@/components/Review/Review';

const RecentReview = () => {
  return (
    <section className="flex h-[39.25rem] flex-col divide-y divide-solid divide-gray-700 rounded-md bg-white shadow-float">
      <h1 className="flex h-12 w-full items-center justify-between px-3.5 text-base font-bold text-gray-100">
        <span className="flex items-center gap-[0.38rem]">
          <ReviewSVG width="22" height="22" className="fill-sub-color1" />
          클래스 리뷰
        </span>
        {/* 링크 연결하기  */}
        <Link
          href=""
          className="flex cursor-pointer items-center text-sm font-medium text-gray-500"
        >
          더 보러가기
          <ArrowUpSVG
            width="24"
            height="24"
            className="rotate-90 fill-gray-500"
          />
        </Link>
      </h1>
      <ul className="divide-y divide-solid divide-gray-700">
        <ReviewList />
        <ReviewList />
        <ReviewList />
        <ReviewList />
        <ReviewList />
      </ul>
    </section>
  );
};

export default RecentReview;

const ReviewList = () => {
  return (
    <li className="flex h-[7.31rem] flex-col justify-center px-3.5 text-sm">
      <div className="mb-3.5 flex items-center gap-[0.37rem]">
        <ProfileImg size="small" src={null} label={false} />
        <div className="flex flex-col gap-1">
          <p className="flex gap-[0.31rem] whitespace-nowrap text-sm">
            닉네임
            <span className="line-clamp-1 text-gray-500">
              가비쌤과 함께하는 왁킹 클래스
            </span>
          </p>
          <Review average={4} />
        </div>
      </div>
      <p className="line-clamp-2 w-full text-sm font-normal leading-5">
        가장 최근에 올라온 리뷰 4개만 보여주기, 더보기 클릭하면 리뷰관리
        페이지로 이동 가장 최근에 올라온 리뷰 4개만 보여주기, 더보기 클릭하면
        리뷰관리 페이지로 이동
      </p>
    </li>
  );
};
