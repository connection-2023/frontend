import Image from 'next/image';
import Link from 'next/link';
import bannerImg from '@/images/banner.png';

const Banner = () => {
  return (
    <div className="mb-2.5 flex h-full w-full items-center justify-center bg-black md:gap-x-12">
      <div className="ml-4 flex h-full w-fit flex-col justify-center whitespace-nowrap text-white">
        <p className="text-xs md:text-base lg:text-lg">
          원데이 클래스, 정규 레슨, 단체 레슨, 프라이빗 수업...
        </p>
        <p className="mb-4 text-lg font-bold md:text-3xl lg:text-4xl">
          댄스 클래스를 더 간편하게 찾다
        </p>

        <Link
          href="/class"
          className="flex h-7 w-32 items-center justify-center rounded-[3.13rem] bg-main-color text-sm font-bold text-white md:h-[2.8rem] md:w-[14.375rem] md:text-lg"
        >
          클래스 보러가기
        </Link>
      </div>

      <figure className="mr-1 min-w-48 max-w-[751px] flex-1 -rotate-3 sm:rotate-0">
        <Image
          src={bannerImg}
          width={0}
          height={0}
          priority={true}
          alt="배너 이미지"
          style={{ height: 'auto', width: '100%' }}
          className="object-cover"
        />
      </figure>
    </div>
  );
};

export default Banner;
