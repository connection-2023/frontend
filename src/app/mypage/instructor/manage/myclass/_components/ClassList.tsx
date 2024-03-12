import { useRouter } from 'next/navigation';
import { formatShortDate } from '@/utils/dateTimeUtils';
import { ILecturerClassListResonse } from '@/types/class';

interface ClassListProps extends ILecturerClassListResonse {
  isProgress: boolean;
}

const ClassList = ({
  isProgress,
  id,
  schedulesCount,
  completedSchedulesCount,
  startDate,
  endDate,
  title,
}: ClassListProps) => {
  const router = useRouter();
  const status = isProgress ? '모집중' : '마감';
  const range = `${formatShortDate(startDate)} - ${formatShortDate(endDate)}`;
  const progressRate = Math.floor(
    (completedSchedulesCount / schedulesCount) * 100,
  );

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
      <div className="mb-3.5 flex items-center px-5">
        <p
          className={`mr-2 flex h-6 w-14 items-center justify-center border-2 border-solid border-gray-500 text-sm font-bold ${
            isProgress ? 'text-gray-100' : 'text-gray-500'
          }`}
        >
          {status}
        </p>
        <span
          className={`text-sm font-normal ${
            isProgress ? 'text-gray-100' : 'text-gray-500'
          }`}
        >
          {range}
        </span>
        <p className="flex flex-1 items-center justify-end text-sm font-semibold text-gray-500">
          더보기
          <span className="ml-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-solid border-gray-500 py-1 text-xl font-semibold text-sub-color1">
            +
          </span>
        </p>
      </div>
      <h2
        onClick={handleTitleClick}
        className="mb-3 w-fit px-5 text-base font-bold text-black underline underline-offset-2"
      >
        {title}
      </h2>
      {isProgress && (
        <>
          <div className="mb-2 flex items-center border-t border-solid border-gray-700 px-5 pt-3.5 text-sm">
            <p className="mr-3.5 text-sub-color1">
              진행
              <span className="font-bold"> {completedSchedulesCount}회</span>
            </p>
            <p className="text-gray-100">
              전체<span className="font-bold"> {schedulesCount}회</span>
            </p>
            <span className="flex flex-1 justify-end text-base font-bold">
              {progressRate}%
            </span>
          </div>
          <div className="px-5">
            <div className="h-1.5 w-full bg-gray-300">
              <div
                className="h-full bg-sub-color1 text-right transition-all duration-1000 ease-in-out"
                style={{ width: `${progressRate}%` }}
              />
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default ClassList;
