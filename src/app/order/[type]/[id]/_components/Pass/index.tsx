import Link from 'next/link';
import AppliedClassView from './AppliedClassView';
import ProfileImg from '@/components/Profile/ProfileImage';
import { IPassInfoForIdData } from '@/types/pass';

const PassInfo = ({ passInfo }: { passInfo: IPassInfoForIdData }) => {
  const { lecturer, price, maxUsageCount, availableMonths, lecturePassTarget } =
    passInfo;

  return (
    <section className="mt-5 rounded-md px-4 py-4 shadow-vertical">
      <div className="w-full whitespace-nowrap">
        <h3 className="mb-3 text-lg font-semibold">패스권 정보</h3>
        <dl className="grid grid-cols-[4rem,1fr] items-center gap-x-3 gap-y-3 text-sm [&>dt]:font-semibold [&>dt]:text-gray-500">
          <dt>강사</dt>
          <dd>
            <Link
              className="flex w-fit items-center"
              href={`/instructor/${lecturer.id}`}
            >
              <ProfileImg size="small" src={lecturer.profileCardImageUrl} />
              {lecturer.nickname}
            </Link>
          </dd>
          <dt>가격</dt>
          <dd>{price.toLocaleString()}원</dd>
          <dt>횟수</dt>
          <dd>{maxUsageCount}회</dd>
          <dt>이용기간</dt>
          <dd className="flex gap-2">
            <p>{availableMonths}개월</p>
            <p className="hidden text-main-color sm:block">
              *이용 기간은 패스권 이용 시작일로부터 차감됩니다.
            </p>
          </dd>
          <p className="col-span-2 w-full whitespace-pre-wrap text-main-color sm:hidden">
            *이용 기간은 패스권 이용 시작일로부터 차감됩니다.
          </p>
        </dl>
        <hr className="my-3 border-gray-700" />
        <AppliedClassView appliedClassList={lecturePassTarget} />
      </div>
    </section>
  );
};

export default PassInfo;
