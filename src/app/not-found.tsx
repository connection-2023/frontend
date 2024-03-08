'use client';
import Image from 'next/image';
import Link from 'next/link';
import NotFoundImg from '@/images/NotFound.png';

const NotFound = () => (
  <main className="flex flex-1 flex-col items-center justify-center px-4 pb-20">
    <figure className="block h-fit w-4/5 max-w-[377px] sm:w-3/5">
      <Image
        src={NotFoundImg}
        width={0}
        height={0}
        sizes="100vw"
        priority={true}
        alt="404 이미지"
        className="h-auto w-full"
      />
    </figure>

    <h1 className="mb-5 text-lg font-extrabold sm:text-2xl">
      찾을 수 없는 페이지를 요청하셨습니다.
    </h1>

    <p className="mb-12 whitespace-pre-wrap break-keep text-center text-sm font-medium sm:text-base">
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
  </main>
);

export default NotFound;
