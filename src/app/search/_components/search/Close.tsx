'use client';
import { useRouter } from 'next/navigation';
import { CloseSVG } from '@/icons/svg';

const Close = () => {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };
  return (
    <CloseSVG
      width={24}
      height={24}
      onClick={onClickClose}
      className="cursor-pointer stroke-gray-500 stroke-2"
    />
  );
};

export default Close;
