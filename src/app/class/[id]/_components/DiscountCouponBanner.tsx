'use client';
import { useState } from 'react';
import { DownloadSVG } from '@/icons/svg';
import Button from '@/components/Button/Button';
import DownloadCoupon from '@/components/Coupon/DownloadCoupon';
import Modal from '@/components/Modal/Modal';
import { IclassCoupon, IclassCouponList } from '@/types/coupon';

interface DiscountCouponBannerProps {
  couponList: IclassCouponList[];
  price: number;
}

const DiscountCouponBanner = ({
  couponList: getCouponList,
  price,
}: DiscountCouponBannerProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [couponList, setCouponList] = useState(getCouponList);

  const maxDiscount = calculateMaxDiscount(price, getCouponList);

  const couponListPop = (id: number) => {
    setCouponList((list) =>
      list.filter(({ lectureCoupon }) => lectureCoupon.id !== id),
    );
  };

  return (
    <>
      <div
        onClick={() => setIsOpened(true)}
        className="flex h-[2.2rem] w-full cursor-pointer items-center gap-0.5 rounded-md border border-solid border-sub-color1 px-2.5 text-sm font-medium text-sub-color1 md:justify-center"
      >
        <DownloadSVG width="21" height="21" className="fill-sub-color1" />
        최대 {maxDiscount.toLocaleString()}원 할인쿠폰 받기
      </div>
      {isOpened && (
        <Modal isOpened={isOpened} handleClosed={() => setIsOpened(false)}>
          <section className="w-screen max-w-[28.125rem]">
            <h1 className="mb-3 flex w-full justify-center border-b border-gray-500 py-4 text-xl font-semibold">
              쿠폰
            </h1>
            <ul className="flex max-h-96 flex-col items-center overflow-y-auto py-2">
              {couponList.map(({ lectureCoupon }) => (
                <li key={lectureCoupon.id}>
                  <DownloadCoupon
                    coupon={lectureCoupon}
                    couponListPop={couponListPop}
                  />
                </li>
              ))}
            </ul>
            <div className="flex w-full justify-center px-11 py-5">
              <Button>모두 다운받기</Button>
            </div>
          </section>
        </Modal>
      )}
    </>
  );
};

export default DiscountCouponBanner;

const calculateMaxDiscount = (
  lecturePrice: number,
  coupons: IclassCouponList[],
) => {
  const normalCoupons = [] as IclassCoupon[];
  const stackableCoupons = [] as IclassCoupon[];

  coupons.forEach(({ lectureCoupon: coupon }) => {
    (coupon.isStackable ? stackableCoupons : normalCoupons).push(coupon);
  });

  const calculateDiscount = (coupon: IclassCoupon, price: number) => {
    let discount = 0;
    if (coupon.percentage) {
      discount = (price * coupon.percentage) / 100;
    } else if (coupon.discountPrice) {
      discount = coupon.discountPrice;
    }

    return coupon.maxDiscountPrice && discount > coupon.maxDiscountPrice
      ? coupon.maxDiscountPrice
      : discount;
  };

  const calculateMaxDiscounts = (coupons: IclassCoupon[]) => {
    let maxDiscount = 0;
    let maxPercentDiscount = 0;

    coupons.forEach((coupon) => {
      const discount = calculateDiscount(coupon, lecturePrice);
      if (coupon.percentage) {
        maxPercentDiscount = Math.max(discount, maxPercentDiscount);
      } else {
        maxDiscount = Math.max(discount, maxDiscount);
      }
    });

    return { maxDiscount, maxPercentDiscount };
  };

  const {
    maxDiscount: maxNormalDiscount,
    maxPercentDiscount: maxNormalPercentDiscount,
  } = calculateMaxDiscounts(normalCoupons);
  const {
    maxDiscount: totalStackableDiscount,
    maxPercentDiscount: maxStackablePercentDiscount,
  } = calculateMaxDiscounts(stackableCoupons);

  return Math.max(
    maxNormalDiscount + totalStackableDiscount,
    maxNormalDiscount + maxStackablePercentDiscount,
    maxNormalPercentDiscount + totalStackableDiscount,
  );
};
