'use client';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { ChangeEvent, useMemo, useState } from 'react';
import formatDate from '@/utils/formatDate';
import ProfileImg from '@/components/Profile/ProfileImage';
import { IpassTable } from '@/types/pass';

interface PassDetailProps {
  passSituation: IpassTable[];
}

const PassDetail = ({ passSituation: reqPassSituation }: PassDetailProps) => {
  const [passSituation, setPassSituation] = useState(reqPassSituation);

  const columnHelper = createColumnHelper<IpassTable>();
  const columns = useMemo<ColumnDef<IpassTable, any>[]>(
    () => [
      columnHelper.accessor('user', {
        header: '구매한 수강생',
        cell: ({ getValue }) => {
          const { img, nickname } = getValue();
          return (
            <div className="flex max-w-[8.5rem] items-center lg:max-w-[17rem]">
              <ProfileImg
                src={img}
                nickname={nickname}
                size="small"
                label={false}
              />
              <span className="flex-grow truncate">{nickname}</span>
            </div>
          );
        },
      }),
      columnHelper.accessor('classList', {
        header: '사용한 클래스',
        cell: ({ getValue }) => {
          const classList = getValue();
          return classList.length > 0 ? (
            <div className="flex items-center">
              <p className="truncate sm:max-w-[6rem] md:max-w-[14rem] lg:max-w-[22rem]">
                {classList[0]}
              </p>
              <span>+{classList.length}</span>
            </div>
          ) : (
            <div>미사용</div>
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
      columnHelper.accessor('purchaseDate', {
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
      columnHelper.accessor(
        (d) => ({
          startAt: d.startAt,
          endAt: d.endAt,
        }),
        {
          header: '만료/잔여기간',
          cell: ({ getValue }) => {
            const { startAt, endAt } = getValue();

            if (startAt && endAt) {
              const diffTime = Math.abs(endAt - startAt);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

              return (
                <div className="hidden gap-1 sm:flex">
                  {formatDate(endAt)}
                  <p>({diffDays})일</p>
                </div>
              );
            }
            return <div>미사용</div>;
          },
        },
      ),
    ],
    [columnHelper],
  );

  const table = useReactTable({
    data: passSituation,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const changeInUseCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setPassSituation(
        reqPassSituation.filter(({ classList }) => classList.length > 0),
      );
    } else {
      setPassSituation(reqPassSituation);
    }
  };

  return (
    <>
      <div className="flex flex-col px-2 py-5 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center whitespace-nowrap">
            <p className="font-semibold">총 판매량</p>
            <p className="ml-2 font-semibold sm:text-lg sm:text-main-color">
              {reqPassSituation.length}매
            </p>
            <div className="ml-4 flex items-center gap-1">
              <input
                id="inUse"
                type="checkbox"
                className="peer mr-1 h-7 w-[1.12rem] accent-sub-color1"
                onChange={changeInUseCheck}
              />
              <label
                htmlFor="inUse"
                className="cursor-pointer select-none text-gray-500 peer-checked:text-black"
              >
                현재 이용중
              </label>
            </div>
          </div>

          <select
            className="h-7 w-[5.75rem] border border-solid border-gray-500"
            onChange={(e) =>
              setPassSituation(() => [
                ...reqPassSituation.slice(0, Number(e.target.value)),
              ])
            }
          >
            <option value={10}>10개</option>
            <option value={20}>20개</option>
            <option value={30}>30개</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col px-2 py-5 sm:p-5">
        <table className="text-sm">
          <thead className="whitespace-nowrap border-b border-solid border-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={`py-2 text-sm text-gray-300 sm:text-left ${
                      (index === 1 || index === 4) && 'hidden sm:table-cell'
                    } ${index === 0 && 'text-left'} ${
                      index === 5 && 'table-cell sm:hidden'
                    }`}
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
              <tr
                key={row.id}
                className="border-b border-solid border-gray-700"
              >
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={`${
                      (index === 1 || index === 4) &&
                      'hidden py-4 sm:table-cell'
                    }`}
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
