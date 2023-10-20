import { FilterSVG, ResetSVG } from '@/icons/svg';
import useCouponStore from '@/store/my-coupon';
import ClassFilterList from './ClassFilterList';

const ClassFilter = () => {
  const {
    classFilter,
    refreshButton,
    classFilterViewChange,
    classFilterReset,
  } = useCouponStore();

  return (
    <>
      <button
        className={`group flex items-center gap-2 hover:text-black ${
          !classFilter && 'text-sub-color2'
        }`}
        onClick={classFilterViewChange}
      >
        <FilterSVG
          className={`h-5 w-5 group-hover:fill-black ${
            classFilter ? 'fill-black' : 'fill-sub-color2'
          }`}
        />
        적용 가능한 모든 클래스 보기
      </button>

      {classFilter && refreshButton && (
        <button
          className="group flex items-center gap-1 font-bold text-sub-color2 hover:text-black"
          onClick={classFilterReset}
        >
          초기화
          <ResetSVG className="-translate-y-[1px] fill-sub-color2 group-hover:fill-black" />
        </button>
      )}

      {classFilter && <ClassFilterList />}
    </>
  );
};

export default ClassFilter;
