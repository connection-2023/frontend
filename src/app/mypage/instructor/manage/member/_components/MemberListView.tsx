import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { ChatSVG, MemoSVG } from '@/icons/svg';
import formatDate from '@/utils/formatDate';
import ProfileImg from '@/components/Profile/ProfileImage';
import { MemberData } from '@/types/instructor';
import { PagenationFilterState } from '@/types/types';

interface MemberListViewProps {
  memberList: MemberData[];
  filterState: PagenationFilterState;
  updateFilter: (key: string, value: any) => void;
}

const MemberListView = ({
  memberList,
  filterState,
  updateFilter,
}: MemberListViewProps) => {
  const sortingOptions = [
    { value: 'LATEST', label: '최신순' },
    { value: 'ASC', label: '내림차순' },
    { value: 'HIGHEST_APPLICANTS', label: '수강 횟수순' },
  ];

  const takeOptions = [
    { value: '10', label: '10줄' },
    { value: '20', label: '20줄' },
    { value: '30', label: '30줄' },
  ];

  const columnHelper = createColumnHelper<MemberData>();
  const columns = useMemo<ColumnDef<MemberData, any>[]>(
    () => [
      columnHelper.accessor('user', {
        id: 'member',
        header: '수강생',
        cell: ({ getValue }) => {
          const { nickname, userProfileImage, id } = getValue();

          return (
            <div className="flex w-full max-w-[9rem] items-center gap-2 lg:max-w-[10.7rem]">
              <ProfileImg
                src={userProfileImage}
                nickname={nickname}
                size="small"
                label={false}
              />
              <span className="flex-grow truncate">{nickname}</span>
            </div>
          );
        },
      }),
      columnHelper.accessor('user', {
        id: 'phoneNumber',
        header: '연락처',
        cell: ({ getValue }) => {
          const { phoneNumber } = getValue();
          return <div>{phoneNumber}</div>;
        },
      }),
      columnHelper.accessor('reservation', {
        id: 'class',
        header: () => {
          return <div className="hidden sm:block">최근 신청한 클래스</div>;
        },
        cell: ({ getValue }) => {
          const { lectureSchedule, regularLectureStatus } = getValue();

          let title;

          if (lectureSchedule) {
            const { lecture } = lectureSchedule;
            title = lecture.title;
          } else if (regularLectureStatus) {
            const { lecture } = regularLectureStatus;
            title = lecture.title;
          }

          return (
            <div className="hidden truncate sm:block sm:max-w-[15rem] md:max-w-[13rem] lg:max-w-[23rem]">
              {title}
            </div>
          );
        },
      }),
      columnHelper.accessor('reservation', {
        id: 'schedule',
        header: () => {
          return <div className="hidden md:block">수업 일정</div>;
        },
        cell: ({ getValue }) => {
          const { lectureSchedule, regularLectureStatus } = getValue();

          let schedule;

          if (lectureSchedule) {
            const { startDateTime, endDateTime } = lectureSchedule;

            schedule = `${formatDate(startDateTime)} ~ ${formatDate(
              endDateTime,
            )}`;
          } else if (regularLectureStatus) {
            const { regularLectureSchedule } = regularLectureStatus;
            const { startDateTime, endDateTime } = regularLectureSchedule[0];

            schedule = `${formatDate(startDateTime)} ~ ${formatDate(
              endDateTime,
            )} ${
              regularLectureSchedule.length > 0
                ? `외 ${regularLectureSchedule.length}`
                : ''
            }`;
          }

          return <div className="hidden md:block">{schedule}</div>; //{lectureSchedule.startDateTime}
        },
      }),
      columnHelper.accessor('memo', {
        id: 'memo',
        header: () => {
          return <div className="flex justify-center">메모</div>;
        },
        cell: ({ getValue }) => {
          const date = getValue();

          return (
            <div className="flex w-full justify-center">
              <button>
                <MemoSVG className="h-5 w-5 stroke-gray-100" />
              </button>
            </div>
          );
        },
      }),
      columnHelper.accessor('user', {
        id: 'chat',
        header: () => {
          return <div className="flex justify-center">채팅</div>;
        },
        cell: ({ getValue }) => {
          const date = getValue();

          return (
            <div className="flex w-full justify-center">
              <button>
                <ChatSVG className="h-5 w-5 fill-gray-100" />
              </button>
            </div>
          );
        },
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: memberList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <nav className="flex justify-between">
        <Select
          name="sorting"
          value={filterState.orderBy}
          onChange={(e) => updateFilter('sortOption', e.target.value)}
          options={sortingOptions}
        />

        <Select
          name="take"
          value={filterState.take}
          onChange={(e) => updateFilter('take', e.target.value)}
          options={takeOptions}
        />
      </nav>
      <table className="text-sm">
        <thead className="whitespace-nowrap border-b border-solid border-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  className={`py-2 text-left text-sm text-gray-300 `}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-solid border-gray-700">
              {row.getVisibleCells().map((cell, index) => (
                <td key={cell.id} className="py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MemberListView;

interface SelectProps {
  name: string;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: {
    label: string;
    value: string | number;
  }[];
}

const Select = ({ name, value, onChange, options }: SelectProps) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className="h-7 outline outline-1 outline-gray-500 focus:outline-sub-color1"
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
