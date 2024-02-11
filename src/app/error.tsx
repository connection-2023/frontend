'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import errorImg from '@/images/ErrorImg.webp';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mt-24 flex h-fit flex-col items-center justify-center">
      <figure className="mx-auto max-w-[9.25rem]">
        <Image
          src={errorImg}
          width={0}
          height={0}
          priority={true}
          sizes="(min-width: 60em) 24vw,
          (min-width: 28em) 45vw,
          100vw"
          alt="오류 발생!"
          style={{ height: 'auto', width: '100%' }}
          className="object-cover"
        />
      </figure>

      <h1 className="mt-10 text-center text-xl font-bold leading-8">
        요청하신 페이지를 불러오는 중에 오류가 발생했습니다.
        <br />
        잠시 후 다시 시도해주세요
      </h1>

      <div className="mt-6 flex gap-4 text-lg font-bold text-main-color">
        <button
          onClick={() => router.back()}
          className="w-56 rounded-[3rem] border border-solid border-main-color py-3 text-center"
        >
          이전 페이지로 이동
        </button>

        <button
          onClick={() => reset()}
          className="w-56 rounded-[3rem] border border-solid border-main-color py-3"
        >
          재시도
        </button>
      </div>
    </div>
  );
}
