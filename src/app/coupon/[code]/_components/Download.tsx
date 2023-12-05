'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import { getPrivateCoupon } from '@/lib/apis/couponApis';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import Button from '@/components/Button/Button';
import { FetchError } from '@/types/types';

const Download = ({ code }: { code: string }) => {
  const router = useRouter();

  const downloadCoupon = async () => {
    try {
      await getPrivateCoupon(code);

      router.push('/my/user/coupon-pass?state=coupon');
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await getPrivateCoupon(code);
          } catch (error) {
            const confirmRedirect = window.confirm(
              '로그인이 필요합니다. 로그인하러 이동 하시겠습니까?',
            );
            if (confirmRedirect) {
              router.push('/login');
            }
          }
        } else {
          toast.error('잘못된 요청입니다!');
        }
      }
    }
  };

  return <Button onClick={downloadCoupon}>다운로드</Button>;
};

export default Download;
