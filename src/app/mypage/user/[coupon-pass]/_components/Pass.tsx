import formatDate from '@/utils/formatDate';
import { userPassList } from '@/types/pass';

const Pass = ({ passInfo }: { passInfo: userPassList }) => {
  const { remainingUses, lecturePass, startAt, endAt } = passInfo;

  return (
    <dl className="flex flex-col justify-evenly gap-3 p-[10px] text-sm shadow-float ">
      <div className="flex items-center justify-between text-main-color">
        <dd className="text-xl font-bold underline underline-offset-2">
          {lecturePass.maxUsageCount}회
        </dd>
        <dd className="flex gap-1 font-semibold">
          <p className="text-black">잔여횟수</p>
          {remainingUses}회
        </dd>
      </div>
      <div className="flex flex-col">
        <dt className="truncate">{lecturePass.title}</dt>
        <div className="flex justify-between">
          {startAt && endAt ? (
            <dd>{`${formatDate(startAt)} - ${formatDate(endAt)}`}</dd>
          ) : (
            <dd>미사용 ({lecturePass.maxUsageCount}개월)</dd>
          )}
        </div>
      </div>
    </dl>
  );
};

export default Pass;
