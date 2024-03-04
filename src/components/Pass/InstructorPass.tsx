import AppliedList from './AppliedList';
import { IpassData } from '@/types/pass';

const InstructorPass = ({
  passInfo,
  lastItemElementRef,
  selectPassHandler,
}: {
  passInfo: IpassData;
  selectPassHandler?: (data: IpassData | null) => void;
  lastItemElementRef?: (node: HTMLElement | null) => void;
}) => {
  const {
    maxUsageCount,
    price,
    title,
    availableMonths,
    salesCount,
    lecturePassTarget,
  } = passInfo;
  return (
    <dl
      ref={lastItemElementRef}
      className={`relative flex w-[20.5rem] ${
        selectPassHandler && 'cursor-pointer hover:shadow-horizontal'
      } flex-col justify-evenly gap-1 p-3 text-sm shadow-float sm:w-[18.125rem]`}
      onClick={
        selectPassHandler ? () => selectPassHandler(passInfo) : undefined
      }
    >
      <div className="flex justify-between text-xl font-bold text-main-color">
        <dt>{maxUsageCount}회</dt>
        <dd>{price.toLocaleString() + '원'}</dd>
      </div>
      <dd className="mt-4 w-full truncate">{title}</dd>
      <dd>{availableMonths}개월</dd>
      <div className="flex justify-between text-gray-300">
        <AppliedList
          appliedList={lecturePassTarget.map(({ lecture }) => ({ ...lecture }))}
        />
        <dd>누적 판매량:{salesCount}</dd>
      </div>
    </dl>
  );
};

export default InstructorPass;
