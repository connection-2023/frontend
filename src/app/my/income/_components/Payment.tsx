import { useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { format, isValid, parse } from 'date-fns';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import IncomeCalendar from '@/components/Calendar/IncomeCalendar';
import {
  BasicCalendarSVG,
  MoneySVG,
  DoubleRightSVG,
} from '../../../../../public/icons/svg';
import { IPaymentList } from '@/types/types';
import { dummyPaymentList } from '@/constants/dummy';

const columns: ColumnDef<IPaymentList, any>[] = [
  {
    accessorKey: 'date',
    header: '신청일',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'period',
    header: '정산기간',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'amount',
    header: '정산금',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'status',
    header: '상태',
    cell: (info) => info.getValue(),
  },
];

const Payment = () => {
  const [fromValue, setFromValue] = useState<string | undefined>('2023-09-04');
  const [toValue, setToValue] = useState<string | undefined>(undefined);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const ref = useRef(null);
  const classRange = {
    from: fromValue ? parse(fromValue, 'y-MM-dd', new Date()) : undefined,
    to: toValue ? parse(toValue, 'y-MM-dd', new Date()) : undefined,
  };
  const [data, setData] = useState<IPaymentList[]>(dummyPaymentList);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  useClickAway(ref, () => {
    setIsCalendarVisible(false);
  });

  const openCalendar = () => {
    setIsCalendarVisible(true);
  };

  const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToValue(event.target.value);
  };

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
  ) => {
    if (!fromValue && !toValue && range?.from) {
      setToValue(format(range.from, 'y-MM-dd'));
    }

    if (range?.to && isValid(range.to)) {
      setToValue(format(range.to, 'y-MM-dd'));
    } else {
      setToValue('');
    }
  };

  return (
    <div className="flex w-full max-w-[40rem] flex-col gap-7 text-sub-color3 ">
      <section className="rounded-[0.31rem] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)]">
        <h1 className="flex h-11 items-center border-b border-solid border-sub-color2 px-4 text-base font-semibold">
          정산 기간 설정
        </h1>
        <div className="flex justify-between gap-2 p-4">
          <div className="flex w-full whitespace-nowrap">
            <div
              ref={ref}
              className="relative flex h-7 w-full max-w-[312px] items-center text-base text-sub-color3"
            >
              <input
                disabled
                value={fromValue || ''}
                className="max-w-[7.5rem] rounded-[0.31rem] border border-solid border-sub-color2 px-1 text-sub-color2"
              />

              <span className="mx-1"> – </span>
              <div className="flex w-fit items-center overflow-hidden rounded-[0.31rem] border border-solid border-sub-color2">
                <input
                  placeholder="마지막 날짜"
                  value={toValue || ''}
                  onChange={handleToChange}
                  onFocus={openCalendar}
                  className="w-[7.5rem] px-1 focus:outline-none"
                />
                <span className="mr-2 flex w-full justify-end">
                  <BasicCalendarSVG
                    onClick={() => setIsCalendarVisible((prev) => !prev)}
                    className="flex cursor-pointer fill-sub-color1"
                  />
                </span>
                {isCalendarVisible && (
                  <IncomeCalendar
                    selectedRange={classRange}
                    handleRangeSelect={handleRangeSelect}
                  />
                )}
              </div>
            </div>

            <div className="flex">
              <button className="flex w-fit cursor-default items-center">
                <DoubleRightSVG />
              </button>

              <p className="flex items-center gap-3 text-sm font-semibold text-sub-color2">
                정산 받을 금액
                <span className="text-lg text-sub-color3">450,000원</span>
              </p>
            </div>
          </div>

          <button
            // --- 버튼 클릭 시 로직 추가 ---
            className="flex h-7 w-24 shrink-0 items-center justify-center whitespace-nowrap rounded-[0.31rem] bg-main-color text-sm font-semibold text-white"
          >
            <MoneySVG width="18" height="18" fill="white" stroke="white" />
            정산신청
          </button>
        </div>
      </section>

      <section>
        <div className=" mb-2 flex w-full justify-between">
          <h1 className="text-lg font-semibold">정산 내역</h1>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="h-7 w-[5.75rem] border border-solid border-sub-color2"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}개
              </option>
            ))}
          </select>
        </div>

        <table className="mb-5 box-border w-full border-collapse border border-solid border-sub-color2">
          <thead className="flex w-full border-collapse text-left text-sm font-semibold">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="flex w-full flex-nowrap justify-between whitespace-nowrap"
              >
                {headerGroup.headers.map((header, index) => {
                  return (
                    <th
                      key={header.id}
                      className={`flex items-center justify-start border-l border-solid border-sub-color2 px-2 py-[0.81rem] ${getCellWidth(
                        index,
                      )}`}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="flex w-full border-collapse flex-col text-left text-sm font-normal">
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className="flex w-full flex-nowrap justify-between whitespace-nowrap border-t border-solid border-sub-color2"
                >
                  {row.getVisibleCells().map((cell, index) => {
                    return (
                      <td
                        key={cell.id}
                        className={`border-l border-solid border-sub-color2 px-2 py-[0.81rem] ${getCellWidth(
                          index,
                        )}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* nav 버튼들 --- 공통 컴포넌트로 변경 예정 --- */}
        <div className="mb-[1.31rem] flex w-full items-center justify-center gap-2">
          <button
            className="rounded border p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="rounded border p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>

          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 rounded border p-1"
            />
          </span>

          <button
            className="rounded border p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>

          <button
            className="rounded border p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Payment;

const getCellWidth = (index: number) => {
  switch (index) {
    case 0:
      return 'w-20 truncate border-none';
    case 1:
      return 'w-[9.5rem] truncate';
    case 2:
      return 'w-20';
    case 3:
      return 'w-[5.12rem]';
    case 4:
      return 'w-12';
    default:
      return '';
  }
};
