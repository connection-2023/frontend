import Image from 'next/image';
import Link from 'next/link';
import errorImg from '@/images/ErrorImg.webp';

interface ErrorProps {
  toHome?: boolean;
  retry?: boolean;
  handleRetry?: () => void;
}

const Error = ({ toHome = false, retry = false, handleRetry }: ErrorProps) => {
  return (
    <>
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

      <p className="font-inherit mt-10 text-center leading-8 text-inherit">
        일시적으로 데이터를 불러올 수 없습니다.
        <br />
        다시 한번 시도해주세요
      </p>

      {toHome && (
        <Link
          href="/"
          className="mx-auto mt-6 w-fit rounded-[3rem] border border-solid border-main-color px-[4.5rem] py-3 text-lg font-bold text-main-color"
        >
          홈으로 가기
        </Link>
      )}

      {retry && (
        <button
          onClick={handleRetry}
          className="mt-6 rounded-[3rem] border border-solid border-main-color px-[4.5rem] py-3 text-lg font-bold text-main-color"
        >
          재시도
        </button>
      )}
    </>
  );
};

export default Error;
