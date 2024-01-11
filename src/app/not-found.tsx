'use client';
import Image from 'next/image';
import Link from 'next/link';
import NotFoundImg from '@/images/NotFound.png';

const NotFound = () => (
  <div className="flex flex-col items-center">
    <div className="block h-fit w-4/5 sm:w-3/5">
      <Image
        src={NotFoundImg}
        width={0}
        height={0}
        sizes="100vw"
        priority={true}
        alt="404 이미지"
        className="mt-[5.5rem] h-auto w-full"
      />
    </div>

    <h2 className="mb-5 text-lg font-extrabold sm:text-2xl">
      찾을 수 없는 페이지를 요청하셨습니다.
    </h2>
    <p className="mb-12 text-center text-sm font-medium sm:text-base">
      찾으려는 페이지의 주소가 잘못 입력되었거나,
      <br />
      주소가 변경, 삭제된 경우 현재 페이지로 이동하게 됩니다.
      <br />
      입력하신 페이지의 주소가 정확한지 다시 한번 확인해주세요.
    </p>
    <Link
      href="/"
      className="rounded-[3rem] border border-solid border-main-color px-[4.5rem] py-3 text-base font-bold text-main-color sm:text-lg"
    >
      홈으로 가기
    </Link>
  </div>
);

export default NotFound;
