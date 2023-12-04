import DownloadCoupon from '@/components/Coupon/DownloadCoupon';
import { instructorProfile } from '@/types/auth';
import { IprivateCoupon, couponGET } from '@/types/coupon';

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
  const lecturerInfo = JSON.parse(
    searchParams.lecturerInfo,
  ) as instructorProfile;
  const coupon = JSON.parse(searchParams.coupon) as IprivateCoupon;

  console.log(lecturerInfo);

  return (
    <main className="flex h-full w-full flex-col items-center gap-7">
      <header className="flex w-full justify-center border-b border-gray-500 pb-4 pt-8 text-2xl font-semibold">
        비밀쿠폰 받기
      </header>
      <section className="flex flex-col gap-3">
        <DownloadCoupon coupon={coupon} />
      </section>
    </main>
  );
};

export default page;
