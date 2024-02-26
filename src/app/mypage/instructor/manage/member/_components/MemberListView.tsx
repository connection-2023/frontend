import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { ChatSVG, MemoSVG } from '@/icons/svg';
import { useMemberStore } from '@/store/memberStore';
import formatDate from '@/utils/formatDate';
import ProfileImg from '@/components/Profile/ProfileImage';
import { MemberData, MemberInfo } from '@/types/instructor';
import { PagenationFilterState } from '@/types/types';

interface MemberListViewProps {
  memberList: MemberData[];
  filterState: PagenationFilterState;
  updateFilter: (key: string, value: any) => void;
}

const ExcelDownload = dynamic(() => import('./ExcelDownload'), {
  ssr: false,
});

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

  const { setMemberInfo } = useMemberStore((state) => ({
    setMemberInfo: state.setMemberInfo,
  }));
  const router = useRouter();

  const selectMemberHandler = (memberInfo: MemberInfo) => {
    setMemberInfo(memberInfo);
    router.push(`/mypage/instructor/manage/member/${memberInfo.id}`);
  };

  const columnHelper = createColumnHelper<MemberData>();
  const columns = useMemo<ColumnDef<MemberData, any>[]>(
    () => [
      columnHelper.accessor(
        (d) => ({
          user: d.user,
          memo: d.memo,
        }),
        {
          id: 'member',
          header: '수강생',
          cell: ({ getValue }) => {
            const { user, memo } = getValue();
            const { nickname, userProfileImage } = user;

            const memberInfo = {
              ...user,
              memo,
            };

            return (
              <button
                onClick={() => selectMemberHandler(memberInfo)}
                className="group flex w-full max-w-[9rem] items-center gap-2 text-left lg:max-w-[10.7rem]"
              >
                <ProfileImg
                  src={userProfileImage}
                  nickname={nickname}
                  size="small"
                  label={false}
                />
                <div className="h-6 flex-grow truncate underline underline-offset-4 group-hover:text-sub-color1">
                  {nickname}
                </div>
              </button>
            );
          },
        },
      ),
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

          const schedule = lectureSchedule
            ? lectureSchedule
            : regularLectureStatus;

          const { lecture } = schedule;

          return (
            <Link
              href={`/class/${lecture.id}`}
              className="hidden truncate hover:text-sub-color1 sm:block sm:max-w-[15rem] md:max-w-[13rem] lg:max-w-[19rem]"
            >
              {lecture.title}
            </Link>
          );
        },
      }),
      columnHelper.accessor('reservation', {
        id: 'schedule',
        header: () => {
          return <div className="hidden md:block">수업 일정</div>;
        },
        cell: ({ getValue }) => {
          const test = getValue();
          const { lectureSchedule, regularLectureStatus } = getValue();

          let schedule;

          if (lectureSchedule) {
            const { startDateTime, endDateTime } = lectureSchedule;

            schedule = `${formatDate(startDateTime, true)} ~ ${formatDate(
              endDateTime,
              true,
            )}`;
          } else if (regularLectureStatus) {
            const { regularLectureSchedule } = regularLectureStatus;
            const { startDateTime, endDateTime } = regularLectureSchedule[0];

            schedule = `${formatDate(startDateTime, true)} ~ ${formatDate(
              endDateTime,
              true,
            )} ${
              regularLectureSchedule.length > 0
                ? `외 ${regularLectureSchedule.length}`
                : ''
            }`;
          }

          return <div className="hidden md:block">{schedule}</div>;
        },
      }),
      columnHelper.accessor(
        (d) => ({
          user: d.user,
          memo: d.memo,
        }),
        {
          id: 'memo',
          header: () => {
            return <div className="flex justify-center">메모</div>;
          },
          cell: ({ getValue }) => {
            const { user, memo } = getValue();

            const memberInfo = {
              ...user,
              memo,
            };

            return (
              <div className="group flex w-full justify-center">
                <button onClick={() => selectMemberHandler(memberInfo)}>
                  <MemoSVG className="h-5 w-5 stroke-gray-100 group-hover:stroke-sub-color1" />
                </button>
              </div>
            );
          },
        },
      ),
      columnHelper.accessor('user', {
        id: 'chat',
        header: () => {
          return <div className="flex justify-center">채팅</div>;
        },
        cell: ({ getValue }) => {
          const date = getValue();

          return (
            <div className="group flex w-full justify-center">
              <button>
                <ChatSVG className="h-5 w-5 fill-gray-100 group-hover:fill-sub-color1" />
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
      <nav className="mb-5 flex justify-between">
        <Select
          name="sorting"
          value={filterState.orderBy}
          onChange={(e) => updateFilter('sortOption', e.target.value)}
          options={sortingOptions}
        />

        <div className="flex gap-2">
          <Select
            name="take"
            value={filterState.take}
            onChange={(e) => updateFilter('take', e.target.value)}
            options={takeOptions}
          />

          <button className="flex h-7 items-center justify-center whitespace-nowrap rounded-md bg-gray-100 px-2 text-sm text-white">
            <ChatSVG className="h-5 w-5 fill-white" />
            전체 <p className="hidden sm:block">채팅</p>
          </button>

          <ExcelDownload memberList={memberList} />
        </div>
      </nav>
      <table className="text-sm">
        <thead className="whitespace-nowrap border-b border-solid border-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
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
              {row.getVisibleCells().map((cell) => (
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
