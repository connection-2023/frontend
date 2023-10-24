import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { useState } from 'react';
import { dummyPaymentList } from '@/constants/dummy';
import { NotFoundSVG } from '@/icons/svg';
import { IPaymentList } from '@/types/types';

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
  const [data, setData] = useState<IPaymentList[]>(dummyPaymentList);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex w-full max-w-[40rem] flex-col gap-7 text-sub-color3 ">
      <section className="rounded-admin bg-white p-5 shadow-float">
        <div
          className={`mb-2 flex w-full ${
            data.length === 0 && 'flex-col'
          } justify-between`}
        >
          <h1 className="text-lg font-semibold">정산 내역</h1>
          {data.length > 0 ? (
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
          ) : (
            <div className="mt-7 flex w-full flex-col items-center justify-center gap-8 text-lg font-semibold text-sub-color3">
              <NotFoundSVG />
              <p>정산 내역이 없습니다!</p>
            </div>
          )}
        </div>
        {data.length > 0 && (
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
        )}
        {/* nav 버튼들 --- 공통 컴포넌트로 변경 예정 --- */}
        {data.length > 0 && (
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
        )}
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
