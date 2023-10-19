interface IClassList {
  status: string;
  date: string;
  title: string;
  count: {
    current: number;
    total: number;
  };
  onItemClick: () => void;
}

const ClassList = ({ status, date, title, count, onItemClick }: IClassList) => {
  return (
    <li
      onClick={onItemClick}
      className="flex w-full max-w-[40.0625rem] cursor-pointer flex-col whitespace-nowrap rounded-[0.3125rem] py-[0.88rem] shadow-[0_1px_4px_1px_rgba(0,0,0,0.25)]"
    >
      <div className="mb-[0.81rem] flex items-center px-[1.37rem]">
        <p className="mr-2 flex h-[1.5625rem] w-[3.5625rem] items-center justify-center border-2 border-solid border-sub-color2 text-sm font-bold text-sub-color3">
          {status}
        </p>
        <span className="text-sm font-normal text-sub-color3">{date}</span>
        <p className="flex flex-1 items-center justify-end text-sm font-semibold text-sub-color2">
          더보기
          <span className="ml-[0.38rem] flex h-[23px] w-[23px] items-center justify-center rounded-full border border-solid border-sub-color2 py-1 text-xl font-semibold text-sub-color1">
            +
          </span>
        </p>
      </div>
      <h2 className="mb-3 px-[1.37rem] text-base font-bold text-black">
        {title}
      </h2>
      <div className="mb-2 flex items-center border-t border-solid border-[#D9D9D9] px-[1.37rem] pt-[0.81rem] text-sm">
        <p className="mr-[0.81rem] text-sub-color1">
          진행<span className="font-bold"> {count.current}회</span>
        </p>
        <p className="text-sub-color3">
          전체<span className="font-bold"> {count.total}회</span>
        </p>
        <span className="flex flex-1 justify-end text-base font-bold">
          {Number((count.current / count.total) * 100)}%
        </span>
      </div>

      <div className="px-[1.37rem]">
        <div className="h-[0.375rem] w-full bg-gray-300">
          <div
            className="h-full bg-sub-color1 text-right transition-all duration-1000 ease-in-out"
            style={{ width: `87%` }}
           />
        </div>
      </div>
    </li>
  );
};

export default ClassList;
