'use client';
import { useRouter } from 'next/navigation';
import { ArrowUpSVG } from '@/icons/svg';

const Back = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="origin-center -rotate-90">
      <ArrowUpSVG width="34" height="34" fill="black" />
    </button>
  );
};

export default Back;
