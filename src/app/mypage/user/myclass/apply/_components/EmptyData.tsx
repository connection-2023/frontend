import Image from 'next/image';
import Link from 'next/link';
import NoDataImg from '@/images/explore.png';

const EmptyData = ({
  activeTab,
}: {
  activeTab: '진행중/예정' | '수강 완료';
}) => (
  <div className="mt-14 flex flex-col items-center">
    <Image
      src={NoDataImg}
      alt="데이터 없음"
      width={184}
      height={174}
      sizes="100vw"
    />

    <p className="mb-2.5 mt-6 text-2xl font-bold">
      {activeTab === '진행중/예정'
        ? '진행중/예정인 클래스가 없습니다.'
        : '수강 완료한 클래스가 없습니다.'}
    </p>

    <p className="mb-6 text-base font-medium">
      더 많은 클래스를 탐색하고 신청해보세요!
    </p>

    <Link
      href="/class"
      className="flex h-11 w-56 items-center justify-center rounded-[50px] border border-solid border-main-color text-lg font-bold text-main-color"
    >
      클래스 둘러보기
    </Link>
  </div>
);

export default EmptyData;
