'use client';
import { CloseSVG } from '@/icons/svg';
import { useRouter } from 'next/navigation';

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
      className="cursor-pointer stroke-sub-color2 stroke-2"
    />
  );
};

export default Close;
