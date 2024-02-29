'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { usePassSelectStore } from '@/store/passSelectStore';
import { IpassTable } from '@/types/pass';

interface PassDetailProps {
  passSituation: IpassTable[];
}

const PassDetail = ({ passSituation }: PassDetailProps) => {
  const { passInfo } = usePassSelectStore((state) => ({
    passInfo: state.passInfo,
  }));

  const router = useRouter();

  useEffect(() => {
    if (!passInfo) {
      router.push('/mypage/instructor/pass');
    }
  }, []);

  return <div />;
};

export default PassDetail;
