import Link from 'next/link';
import Download from './_components/Download';
import Button from '@/components/Button/Button';
import DownloadCoupon from '@/components/Coupon/DownloadCoupon';
import ProfileImage from '@/components/ProfileImage/ProfileImage';
import { instructorProfile } from '@/types/auth';
import { IprivateCoupon } from '@/types/coupon';

interface pageProps {
  params: {
    code: string;
  };
  searchParams: {
    lecturerInfo: string;
    coupon: string;
  };
}

const page = async ({ params, searchParams }: pageProps) => {
  const { nickname, profileCardImageUrl } = JSON.parse(
    searchParams.lecturerInfo,
  ) as instructorProfile;
  const coupon = JSON.parse(searchParams.coupon) as IprivateCoupon;
  return (
    <main className="mb-20 flex h-full w-full flex-col items-center gap-7">
      <header className="flex w-full justify-center border-b border-gray-500 pb-4 pt-8 text-lg font-semibold sm:text-2xl">
        비밀쿠폰 받기
      </header>
      <section className="flex w-[21.8125rem] flex-col gap-5">
        <DownloadCoupon coupon={coupon} code={params.code} />

        <dl className="flex items-center">
          <dt className="w-24 font-semibold">강사</dt>
          <dd>
            <ProfileImage
              size="small"
              src={profileCardImageUrl}
              nickname={nickname}
            />
          </dd>
        </dl>

        <dl className="flex items-center">
          <dt className="w-24 font-semibold">쿠폰명</dt>
          <dd>{coupon.title}</dd>
        </dl>

        <dl className="flex items-center">
          <dt className="w-24 font-semibold">할인</dt>
          <dd>
            {coupon.percentage
              ? coupon.percentage + '%'
              : coupon.discountPrice.toLocaleString() + '원'}
          </dd>
        </dl>

        <dl className="flex items-center">
          <dt className="w-24 font-semibold">사용기간</dt>
          <dd>{coupon.startAt + '-' + coupon.endAt}</dd>
        </dl>

        <dl className="flex flex-col">
          <dt className="font-semibold">
            적용 가능한 클래스({coupon.lectureCouponTarget.length})
          </dt>
          <ul className="list-disc pl-6 pt-3">
            {coupon.lectureCouponTarget.map(({ lecture }) => {
              return (
                <li
                  key={lecture.id + lecture.title}
                  className="mb-1 break-words"
                >
                  <Link
                    href={`/class/${lecture.id}`}
                    className="hover:text-sub-color1"
                  >
                    {lecture.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </dl>

        <Download code={params.code} />
        <Link href="/my/user/coupon-pass?state=coupon">
          <Button color="secondary">쿠폰함 확인하기</Button>
        </Link>
      </section>
    </main>
  );
};

export default page;
