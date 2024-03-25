import { CouponSVG } from '@/icons/svg';
import { getCouponList } from '@/lib/apis/serverApis/couponApis';
import CouponContainer from './CouponContainer';
import { IcouponsData } from '@/types/coupon';

const Coupon = async ({ id, price }: { id: string; price: number }) => {
  const reqData = {
    take: 10000, //추후 null로 변경
    couponStatusOption: 'AVAILABLE' as 'AVAILABLE',
    filterOption: 'LATEST' as 'LATEST',
    lectureIds: [id],
  };

  let couponList: IcouponsData | null = null;
  try {
    couponList = await getCouponList(reqData, 'user');
  } catch (error) {
    console.error(error);
    return null;
  }

  return (
    <section className="mt-4 rounded-md px-4 py-5 shadow-vertical">
      <h3 className="flex gap-1 text-lg font-semibold">
        <CouponSVG className="h-6 w-6 fill-sub-color1" />
        쿠폰 적용
      </h3>

      <CouponContainer couponList={couponList} price={price} />
    </section>
  );
};

export default Coupon;
