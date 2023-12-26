import { FilterSVG, ResetSVG } from '@/icons/svg';

interface ClassFilterSelectUserProps {
  userClassFilterView: boolean;
  changeUserClassFilterView: () => void;
  filterState: string;
  refreshBtnView: boolean;
  triggerClassListRefresh: () => void;
}

const ClassFilterSelectUser = ({
  userClassFilterView,
  changeUserClassFilterView,
  filterState,
  refreshBtnView,
  triggerClassListRefresh,
}: ClassFilterSelectUserProps) => {
  return (
    <div className="flex gap-2 md:ml-7">
      <button
        className={`flex gap-1 ${
          userClassFilterView && filterState === 'AVAILABLE'
            ? 'text-black'
            : 'text-gray-500'
        }`}
        onClick={changeUserClassFilterView}
      >
        <FilterSVG
          className={`h-6 w-6  ${
            userClassFilterView && filterState === 'AVAILABLE'
              ? 'fill-black'
              : 'fill-gray-500'
          }`}
        />
        <p className={userClassFilterView ? 'block' : 'hidden sm:block'}>
          적용 가능한 모든 클래스 보기
        </p>
      </button>

      {refreshBtnView && (
        <button
          className="flex items-center gap-1 font-bold text-gray-500"
          onClick={triggerClassListRefresh}
        >
          초기화 <ResetSVG className="mb-0.5" />
        </button>
      )}
    </div>
  );
};

export default ClassFilterSelectUser;
