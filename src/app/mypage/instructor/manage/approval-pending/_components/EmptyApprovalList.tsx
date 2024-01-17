import Image from 'next/image';
import noPendingDataImg from '@/images/noPendingData.png';

const EmptyApprovalList = () => (
  <div className="mx-auto mt-10 flex max-w-[20rem] flex-col items-center justify-center border-b-2 border-main-color pb-2.5">
    <figure className="mb-7 aspect-[116/130] h-28 md:h-32 lg:h-40">
      <Image
        src={noPendingDataImg}
        alt="승인 대기 리스트 없음"
        width={0}
        height={0}
        sizes="100vw"
        className="h-full w-auto"
      />
    </figure>
    <p className="text-lg font-bold">아직 신청한 회원이 없습니다.</p>
  </div>
);

export default EmptyApprovalList;
