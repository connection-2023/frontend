'use client';
import { CloseSVG } from '@/../public/icons/svg';
import { useRouter } from 'next/navigation';

const Close = () => {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };
  return <CloseSVG onClick={onClickClose} className="cursor-pointer" />;
};

export default Close;
