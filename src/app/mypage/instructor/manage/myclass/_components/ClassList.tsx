import { useRouter } from 'next/navigation';
import { formatShortDate } from '@/utils/dateTimeUtils';
import { ILecturerClassListResonse } from '@/types/class';

interface ClassListProps extends ILecturerClassListResonse {
  isProgress: boolean;
}

const ClassList = ({
  isProgress,
  id,
  allSchedule,
  completedSchedule,
  startDate,
  endDate,
  title,
}: ClassListProps) => {
  const router = useRouter();
  const currentSchedule = allSchedule - completedSchedule;
  const status = isProgress ? '모집중' : '마감';
  const range = `${formatShortDate(startDate)} - ${formatShortDate(endDate)}`;

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/class/${id}`);
  };

  const handleManageDetailClick = () => {
    router.push(`/mypage/instructor/manage/myclass/${id}`);
  };

  return (
    <li
      onClick={handleManageDetailClick}
      className="flex w-full cursor-pointer flex-col whitespace-nowrap rounded-md border border-solid border-gray-700 py-3.5"
    >
      <div className="mb-[0.81rem] flex items-center px-[1.37rem]">
        <p className="mr-2 flex h-[1.5625rem] w-[3.5625rem] items-center justify-center border-2 border-solid border-gray-500 text-sm font-bold text-gray-100">
          {status}
        </p>
        <span className="text-sm font-normal text-gray-100">{range}</span>
        <p className="flex flex-1 items-center justify-end text-sm font-semibold text-gray-500">
          더보기
          <span className="ml-[0.38rem] flex h-[23px] w-[23px] items-center justify-center rounded-full border border-solid border-gray-500 py-1 text-xl font-semibold text-sub-color1">
            +
          </span>
        </p>
      </div>
      <h2
        onClick={handleTitleClick}
        className="mb-3 w-fit px-[1.37rem] text-base font-bold text-black underline underline-offset-2"
      >
        {title}
      </h2>
      <div className="mb-2 flex items-center border-t border-solid border-gray-700 px-[1.37rem] pt-[0.81rem] text-sm">
        <p className="mr-[0.81rem] text-sub-color1">
          진행<span className="font-bold"> {currentSchedule}회</span>
        </p>
        <p className="text-gray-100">
          전체<span className="font-bold"> {allSchedule}회</span>
        </p>
        <span className="flex flex-1 justify-end text-base font-bold">
          {Number((currentSchedule / allSchedule) * 100).toFixed(1)}%
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
