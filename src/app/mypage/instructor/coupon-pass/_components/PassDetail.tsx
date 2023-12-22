import {
  Column,
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { dummyPassTableData } from '@/constants/dummy';
import { Arrow, ArrowRightSVG } from '@/icons/svg';
import formatDate from '@/utils/formatDate';
import Button from '@/components/Button/Button';
import InstructorPass from '@/components/Pass/InstructorPass';
import ProfileImg from '@/components/ProfileImage/ProfileImage';
import { IpassData, IpassTable } from '@/types/pass';

interface PassDetailProps {
  passInfo: IpassData;
}

const PassDetail = ({ passInfo }: PassDetailProps) => {
  const [data, setData] = useState(dummyPassTableData);

  const columnHelper = createColumnHelper<IpassTable>();
  const columns = useMemo<ColumnDef<IpassTable, any>[]>(
    () => [
      columnHelper.accessor('user', {
        header: '구매한 수강생',
        cell: ({ getValue }) => {
          const { img, nickname } = getValue();
          return (
            <div className="max-w-[8.5rem] truncate lg:max-w-[17rem]">
              <ProfileImg src={img} nickname={nickname} size="small" />
            </div>
          );
        },
      }),
      columnHelper.accessor('classList', {
        header: '사용한 클래스',
        cell: ({ getValue }) => {
          const classList = getValue();
          return (
            <div className="flex items-center">
              <p className="truncate sm:max-w-[6rem] md:max-w-[14rem] lg:max-w-[22rem]">
                {classList[0]}
              </p>
              <span>+{classList.length}</span>
            </div>
          );
        },
      }),
      columnHelper.accessor('count', {
        header: '남은횟수',
        cell: ({ getValue }) => {
          const count = getValue();
          return <div className="flex justify-center sm:block">{count}회</div>;
        },
      }),
      columnHelper.accessor('purchase_date', {
        header: '구매일자',
        cell: ({ getValue }) => {
          const date = getValue();
          return (
            <div className="flex justify-center sm:block">
              {formatDate(date)}
            </div>
          );
        },
      }),
      columnHelper.accessor('expiration_date', {
        header: '만료/잔여기간',
        cell: ({ getValue }) => {
          const date = getValue();

          const now = new Date();
          const target = new Date(date);
          const diff = target.getTime() - now.getTime();
          const remainingDays = Math.ceil(diff / (24 * 60 * 60 * 1000));

          return (
            <div className="flex justify-center gap-4 sm:block">
              {formatDate(date)}
              <p>{remainingDays}</p>
            </div>
          );
        },
      }),
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <header className="mb-4 flex items-center justify-between border-b border-solid border-gray-700 p-5">
        <div className="flex text-2xl font-bold">
          <ArrowRightSVG className="h-8 w-8 rotate-180 stroke-black " />
          패스권 현황
        </div>
        <div className="w-28">
          <Button color="secondary" size="small">
            판매 중지
          </Button>
        </div>
      </header>

      <div className="flex justify-between px-5 py-2">
        <dl className="grid flex-grow grid-cols-[1fr,5fr] gap-x-11 gap-y-2 text-sm">
          <dt className="font-semibold text-gray-300">패스권 명칭</dt>
          <dd>{passInfo.title}</dd>
          <dt className="font-semibold text-gray-300">적용된 클래스</dt>
          <dd>
            {passInfo.lecturePassTarget.map(({ lecture }) => (
              <p key={lecture.id}>{lecture.title}</p>
            ))}
          </dd>
          <dt className="font-semibold text-gray-300">사용가능 기간</dt>
          <dd>{passInfo.availableMonths}개월</dd>
          <dt className="font-semibold text-gray-300">횟수</dt>
          <dd>{passInfo.maxUsageCount}회</dd>
          <dt className="font-semibold text-gray-300">판매 가격</dt>
          <dd>{passInfo.price.toLocaleString()}원</dd>
        </dl>

        <div className="h-fit">
          <InstructorPass passInfo={passInfo} />
        </div>
      </div>

      <hr className="h-2 bg-sub-color1-transparent" />

      <div className="flex flex-col px-2 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            총 판매량
            <p className="ml-2">20 회</p>
            <div className="ml-4 flex items-center gap-1">
              <input
                id="inUse"
                type="checkbox"
                className="peer mr-1 h-7 w-[1.12rem] accent-sub-color1"
              />
              <label
                htmlFor="inUse"
                className="cursor-pointer select-none font-semibold text-gray-500 peer-checked:text-black"
              >
                현재 이용중
              </label>
            </div>
          </div>

          <select className="h-7 w-[5.75rem] border border-solid border-gray-500">
            <option value="최신순">최신순</option>
          </select>
        </div>

        <table className="text-sm">
          <thead className="whitespace-nowrap border-b border-solid border-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={`py-2 text-sm text-gray-300 sm:text-left ${
                      index === 1 && 'hidden sm:block'
                    } ${index === 0 && 'text-left'}`}
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
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className="border-b border-solid border-gray-700"
              >
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={`${index === 1 && 'hidden py-4 sm:table-cell'}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PassDetail;
