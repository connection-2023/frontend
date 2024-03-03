import { useQuery } from '@tanstack/react-query';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { useMemo } from 'react';
import { getUserPassForId } from '@/lib/apis/passApis';
import { formatTimeNoSec } from '@/utils/dateTimeUtils';
import formatDate from '@/utils/formatDate';
import { reservation, userPassDetailInfo, userPassList } from '@/types/pass';

interface PassDetailProps {
  selectPass: userPassList;
  expired: boolean;
}

const PassDetail = ({ selectPass, expired }: PassDetailProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pass', selectPass.lecturePassId],
    queryFn: () => getUserPassForId(selectPass.lecturePassId),
  });

  if (isLoading)
    return (
      <div className="flex flex-col">
        <div className="mb-4 h-[475px] w-full animate-pulse border-b border-solid border-gray-500 bg-gray-700 md:col-span-2 xl:col-span-3" />{' '}
      </div>
    ); // 추후 수정
  if (!data || data instanceof Error || error) {
    return;
  }

  const diffTime = Math.abs(
    new Date(selectPass.endAt).getTime() -
      new Date(selectPass.startAt).getTime(),
  );
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const isUsed = selectPass.endAt && selectPass.startAt;

  return (
    <section className="flex w-full max-w-[643px] flex-col gap-2 pt-7">
      <header className=" flex justify-between">
        <h1 className="text-xl font-semibold sm:text-2xl">
          {expired ? (
            <>기간이 만료된 패스권 입니다.</>
          ) : isUsed ? (
            <>
              <span className="text-main-color">{diffDays}일(기간) </span>
              내에
              <span className="text-main-color"> {data.remainingUses}회</span>를
              사용해주세요
            </>
          ) : (
            <>
              <span className="text-main-color"> {data.remainingUses}회 </span>
              사용 가능한 패스권
            </>
          )}
        </h1>
        {/* <Link
          href="/mypage/user/payment-history"
          className="flex w-[75px] items-center justify-center rounded-md border border-solid border-black bg-white text-black hover:bg-black/10 active:bg-black active:text-white"
        >
          구매취소
        </Link> 나타내는게 맞는가..?*/}
      </header>
      <dl className="grid gap-y-2 border-y border-b-gray-700 border-t-gray-500 py-4 text-sm sm:grid-cols-2 sm:gap-y-0 [&>dt]:font-semibold">
        <div className="grid grid-cols-[5.3rem,1fr] gap-y-2">
          <dt>구매일</dt>
          <dd>{formatDate(selectPass.lecturePass.createdAt)}</dd>

          <dt>결제정보</dt>
          <dd>{selectPass.lecturePass.price.toLocaleString()}원</dd>
        </div>

        <div className="grid grid-cols-[5.3rem,1fr] gap-y-2">
          <dt>사용기간</dt>
          <dd>
            {selectPass.lecturePass.availableMonths}개월
            {isUsed &&
              `${formatDate(selectPass.startAt)} - ${formatDate(
                selectPass.endAt,
              )}`}
          </dd>

          {isUsed ? (
            <>
              <dt>잔여일수</dt>
              <dd>{diffDays}일</dd>
            </>
          ) : (
            <div className="col-span-2 text-main-color">
              *이용기간은 패스권 이용 시작일로부터 차감됩니다.
            </div>
          )}
        </div>
      </dl>
      {isUsed && (
        <>
          <h2 className="text-sm font-semibold">패스권 사용내역</h2>
          <Table data={data} />
        </>
      )}
    </section>
  );
};

export default PassDetail;

const Table = ({ data }: { data: userPassDetailInfo }) => {
  const columnHelper = createColumnHelper<reservation>();
  const columns = useMemo<ColumnDef<reservation, any>[]>(
    () => [
      columnHelper.accessor('lectureSchedule', {
        id: 'lecture',
        header: '사용한 클래스',
        cell: ({ getValue }) => {
          const { lecture } = getValue();

          return (
            <Link
              href={`/class/${lecture.id}`}
              className="inline-block max-w-[12rem] truncate hover:text-sub-color1 sm:max-w-[15rem]"
            >
              {lecture.title}
            </Link>
          );
        },
      }),
      columnHelper.accessor('lectureSchedule', {
        id: 'date',
        header: '수업날짜',
        cell: ({ getValue }) => {
          const { startDateTime } = getValue();

          return <div>{formatDate(startDateTime)}</div>;
        },
      }),
      columnHelper.accessor('lectureSchedule', {
        id: 'time',
        header: () => {
          return <div className="hidden sm:block">수업시간</div>;
        },
        cell: ({ getValue }) => {
          const { startDateTime, endDateTime } = getValue();

          return (
            <div className="hidden sm:block">
              {formatTimeNoSec(startDateTime)} - {formatTimeNoSec(endDateTime)}
            </div>
          );
        },
      }),
      columnHelper.accessor('payment', {
        id: 'useDate',
        header: '패스권 사용일',
        cell: ({ getValue }) => {
          const { createdAt } = getValue();
          return <div>{formatDate(createdAt)}</div>;
        },
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: data.reservation,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="text-sm">
      <thead className="whitespace-nowrap border-b border-solid border-gray-700">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={`py-2 pl-2 text-left text-sm text-gray-300 sm:pl-4 `}
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
              <td key={cell.id} className="py-2 pl-2 sm:pl-4">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
