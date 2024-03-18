'use client';
import { useRouter } from 'next/navigation';
import { ArrowUpSVG } from '@/icons/svg';

const BackButton = ({ size = 34 }: { size?: number }) => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="origin-center -rotate-90">
      <ArrowUpSVG width={size} height={size} fill="black" />
    </button>
  );
};

export default BackButton;
