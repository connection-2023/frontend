import { ArrowRightSVG } from '../../../../../../public/icons/svg';

const Pagination = () => {
  return (
    <nav className="flex w-full justify-center gap-6 stroke-[#969696]">
      <button className="flex items-center gap-2 text-[#969696]">
        {/* width="5" height="9" */}
        <ArrowRightSVG className="h-[15px] w-[9px] rotate-180 " />
        이전
      </button>
      <div className="relative">
        <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-sub-color1 text-center text-white">
          1
        </div>
      </div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <button className="flex items-center gap-2 text-[#969696]">
        다음
        <ArrowRightSVG className="h-[15px] w-[9px] " />
      </button>
    </nav>
  );
};

export default Pagination;
