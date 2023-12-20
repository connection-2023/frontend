import AppliedList from './AppliedList';
import { IpassData } from '@/types/pass';

const InstructorPass = ({ passInfo }: { passInfo: IpassData }) => {
  const {
    maxUsageCount,
    price,
    title,
    availableMonths,
    salesCount,
    lecturePassTarget,
  } = passInfo;
  return (
    <dl className="relative flex w-[20.5rem] flex-col justify-evenly gap-1 p-3 text-sm shadow-float sm:w-[18.125rem]">
      <div className="flex justify-between text-xl font-bold text-main-color">
        <dt>{maxUsageCount}회</dt>
        <dd>{price.toLocaleString() + '원'}</dd>
      </div>
      <dd className="mt-4 w-full truncate">{title}</dd>
      <dd>{availableMonths}개월</dd>
      <div className="flex justify-between text-gray-300">
        <AppliedList appliedList={lecturePassTarget} />
        <dd>누적 판매량:{salesCount}</dd>
      </div>
    </dl>
  );
};

export default InstructorPass;
