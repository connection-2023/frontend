import { dummyCouponClassList } from '@/constants/dummy';
import { PlusesSVG } from '@/icons/svg';
import useCouponStore from '@/store/my-coupon';

const ClassFilterList = () => {
  const {
    classFilter,
    classListLength,
    selectClassFilter,
    classFilterChange,
    changeClassListLength,
  } = useCouponStore();

  return (
    <ul className={`flex flex-wrap gap-1 ${classFilter ? '' : ''}`}>
      {dummyCouponClassList
        .slice(0, classListLength)
        .map((className, index) => {
          const isSelected = selectClassFilter.includes(className);
          return (
            <li
              key={className + index}
              className={`mr-4 flex h-7 items-center ${
                isSelected ? 'text-sub-color1' : 'text-sub-color2'
              } hover:font-semibold`}
              onClick={() => classFilterChange(className)}
            >
              <button>{className}</button>
            </li>
          );
        })}
      <button
        className={`flex items-center gap-1 font-semibold text-sub-color2 underline ${
          dummyCouponClassList.length <= classListLength && 'hidden'
        }`}
        onClick={changeClassListLength}
      >
        더보기
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-solid border-sub-color2">
          <PlusesSVG className="h-4 w-4 fill-sub-color1" />
        </div>
      </button>
    </ul>
  );
};

export default ClassFilterList;
