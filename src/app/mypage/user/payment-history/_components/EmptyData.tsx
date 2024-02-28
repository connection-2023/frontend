import Image from 'next/image';
import Link from 'next/link';
import { MYPAGE_FILTER_OPTIONS } from '@/constants/constants';
import NoDataImg from '@/images/explore.png';

const EmptyData = ({
  selectedOption,
}: {
  selectedOption: MYPAGE_FILTER_OPTIONS;
}) => (
  <div className="mt-14 flex flex-col items-center">
    <Image
      src={NoDataImg}
      alt="데이터 없음"
      width={184}
      height={174}
      sizes="100vw"
    />

    <p className="mb-2.5 mt-6 text-2xl font-bold">결제 내역이 없습니다.</p>

    <p className="mb-6 text-base font-medium">
      더 많은 {selectedOption === '패스권' ? '패스권' : '클래스'}를 탐색하고
      {selectedOption === '패스권' ? '구매' : '신청'}해보세요!
    </p>

    {selectedOption === '패스권' ? (
      <Link
        href="/pass"
        className="flex h-11 w-56 items-center justify-center rounded-[50px] border border-solid border-main-color text-lg font-bold text-main-color"
      >
        패스권 둘러보기
      </Link>
    ) : (
      <Link
        href="/class"
        className="flex h-11 w-56 items-center justify-center rounded-[50px] border border-solid border-main-color text-lg font-bold text-main-color"
      >
        클래스 둘러보기
      </Link>
    )}
  </div>
);

export default EmptyData;
