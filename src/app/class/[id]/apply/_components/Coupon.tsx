import { getCouponList } from '@/lib/apis/serverApis/couponApis';
import CouponContainer from './Coupon/CouponContainer';
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

  return <CouponContainer couponList={couponList} price={price} />;
};

export default Coupon;
