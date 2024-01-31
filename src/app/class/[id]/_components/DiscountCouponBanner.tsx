'use client';
import router from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { DownloadSVG, NotFoundSVG } from '@/icons/svg';
import { getClassCoupon } from '@/lib/apis/couponApis';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import calculateMaxDiscount from '@/utils/calculateMaxDiscount';
import Button from '@/components/Button/Button';
import DownloadCoupon from '@/components/Coupon/DownloadCoupon';
import Modal from '@/components/Modal/Modal';
import { IclassCoupon } from '@/types/coupon';
import { FetchError } from '@/types/types';

interface DiscountCouponBannerProps {
  couponList: IclassCoupon[];
  price: number;
}

const DiscountCouponBanner = ({
  couponList: getCouponList,
  price,
}: DiscountCouponBannerProps) => {
  const { userType } = useUserStore((state) => ({
    userType: state.userType,
  }));
  const [isOpened, setIsOpened] = useState(false);
  const [couponList, setCouponList] = useState(getCouponList);

  const { maxDiscount } = calculateMaxDiscount(price, getCouponList);

  const couponListPop = (id: number[]) => {
    setCouponList((list) =>
      list.filter(({ id: lectureCouponId }) => !id.includes(lectureCouponId)),
    );
  };

  const downloadClassCoupon = async (id: number | number[]) => {
    const ids = Array.isArray(id) ? id : [id];

    try {
      if (userType === 'user') {
        await getClassCoupon({ couponIds: ids });
        couponListPop(ids);
        toast.success('쿠폰 다운로드 완료');
      } else if (userType) {
        toast.error('유저로 전환이 필요한 서비스 입니다.');
      } else {
        if (
          confirm(`로그인이 필요한 서비스입니다.
로그인 화면으로 이동하시겠습니까?
        `)
        )
          router.push('/signin');
      }
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await getClassCoupon({ couponIds: ids });
            couponListPop(ids);
          } catch (error) {
            console.error(error);
          }
        } else {
          toast.error('잘못된 요청입니다!');
        }
      }
    }
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
              {couponList.length > 0 ? (
                couponList.map((coupon) => (
                  <li key={coupon.id}>
                    <DownloadCoupon
                      coupon={coupon}
                      downloadPublicCoupon={downloadClassCoupon}
                    />
                  </li>
                ))
              ) : (
                <div className="mb-5 flex flex-col items-center justify-center gap-5">
                  <NotFoundSVG />
                  <p>다운 가능한 쿠폰이 없습니다..</p>
                </div>
              )}
            </ul>
            {couponList.length > 0 ? (
              <div className="flex w-full justify-center px-11 py-5">
                <Button
                  onClick={() =>
                    downloadClassCoupon(couponList.map(({ id }) => id))
                  }
                >
                  모두 다운받기
                </Button>
                {/* 추후 백엔드 api 수정 시 모두 다운 로직 추가 */}
              </div>
            ) : null}
          </section>
        </Modal>
      )}
    </>
  );
};

export default DiscountCouponBanner;
