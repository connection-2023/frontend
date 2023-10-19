import Image from 'next/image';
import Link from 'next/link';
import bannerImg from '@/images/banner.png';

const Banner = () => {
  return (
    <div className="mb-[0.69rem] flex h-[472px] w-full items-center justify-center gap-12 bg-black">
      <div className="ml-5 flex h-full w-fit flex-col justify-center whitespace-nowrap text-white">
        <p className="text-lg">
          원데이 클래스, 정규 레슨, 단체 레슨, 프라이빗 수업...
        </p>
        <p className="mb-4 text-4xl font-bold">
          댄스 클래스를 더 간편하게 찾다
        </p>

        <Link
          href=""
          className="flex h-[2.8rem] w-[14.375rem] items-center justify-center rounded-[3.13rem] bg-main-color text-lg font-bold text-white"
        >
          클래스 보러가기
        </Link>
      </div>

      <div>
        <Image src={bannerImg} width={751} height={244} alt="배너 이미지" />
      </div>
    </div>
  );
};

export default Banner;
