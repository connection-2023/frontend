'use client';
import { useQuery } from '@tanstack/react-query';
import CouponContainer from './Coupon/CouponContainer';
import { getCouponLists } from '@/lib/apis/couponApis';

const Coupon = ({ id, price }: { id: string; price: number }) => {
  const reqData = {
    take: 10000, //추후 null로 변경
    couponStatusOption: 'AVAILABLE' as 'AVAILABLE',
    filterOption: 'LATEST' as 'LATEST',
    lectureIds: [id],
  };

  const {
    data: couponList,
    isLoading: couponLoading,
    error: couponError,
  } = useQuery({
    queryKey: ['apply', 'coupon', id],
    queryFn: () => getCouponLists(reqData, 'user'),
  });

  if (!couponList) return null;

  return <CouponContainer couponList={couponList} price={price} />;
};

export default Coupon;
