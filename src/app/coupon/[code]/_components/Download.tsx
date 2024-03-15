'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import { getPrivateCoupon } from '@/lib/apis/couponApis';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import { Button } from '@/components/Button';
import { FetchError } from '@/types/types';

const Download = ({ code }: { code: string }) => {
  const { userType } = useUserStore((state) => ({
    userType: state.userType,
  }));
  const router = useRouter();

  const downloadPrivateCoupon = async () => {
    if (!code) {
      return;
    }
    try {
      if (userType === 'user') {
        await getPrivateCoupon(code);
        router.push('/my/user/coupon-pass?state=coupon');
      } else {
        if (
          confirm(`로그인이 필요한 서비스입니다.
로그인 화면으로 이동하시겠습니까?
        `)
        )
          router.push('/my/user/coupon-pass?state=coupon');
      }
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await getPrivateCoupon(code);
          } catch (error) {
            console.error(error);
          }
        } else {
          toast.error('잘못된 요청입니다!');
        }
      }
    }
  };

  return <Button onClick={downloadPrivateCoupon}>다운로드</Button>;
};

export default Download;
