import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { dummyIncomeList } from '@/constants/dummy';
import { ExcelSVG, BillSVG } from '@/icons/svg';
import { ITableList } from '@/types/types';

const IncomeTable = ({ selectedOption }: { selectedOption: string }) => {
  const columns: ColumnDef<ITableList, any>[] = [
    {
      accessorKey: 'name',
      header: selectedOption === '전체' ? '클래스/패스권' : selectedOption,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'purchase',
      header: '구매자',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'date',
      accessorFn: (row) => row.date,
      header: '판매일',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'price',
      accessorFn: (row) => row.price,
      header: '가격',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'status',
      accessorFn: (row) => row.status,
      header: '상태',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'billing',
      header: '영수증',
      enableSorting: false,
      cell: () => (
        <button className="flex w-full items-center justify-center">
          <BillSVG
            width="21"
            height="21"
            className="stroke-sub-color3 hover:stroke-black"
          />
        </button>
      ),
    },
  ];

  const [data, setData] = useState<ITableList[]>(dummyIncomeList);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const exportToExcel = () => {
    // 마지막 '영수증'열 제외 --- 영수증 디테일 부분 로직 필요--
    const headers = table
      .getHeaderGroups()
      .map((headerGroup) =>
        headerGroup.headers
          .map((header) => header.column.columnDef.header)
          .slice(0, -1),
      );

    const tableData = table.getRowModel().rows.map((row) =>
      row
        .getVisibleCells()
        .map((cell) => cell.getValue())
        .slice(0, -1),
    );

    return [headers[0], ...tableData];
  };

  return (
    <>
      <div className="flex w-full items-center justify-between py-5 text-sm font-semibold">
        <div className="flex gap-5 text-sub-color3">
          <p>총 {table.getPrePaginationRowModel().rows.length}건</p>
          <p>
            정산금 <span className="font-bold">450,800원</span>
          </p>
        </div>

        <div className="flex gap-2">
          {/* 개수만큼 보여주기 */}
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
          <CSVLink
            data={exportToExcel()}
            filename="connection_수입관리.csv"
            className="flex"
          >
            <button className="flex h-7 w-[7.625rem] items-center justify-center whitespace-nowrap rounded-[0.31rem] bg-sub-color3 text-white">
              <ExcelSVG width="20" height="20" />
              엑셀 다운로드
            </button>
          </CSVLink>
        </div>
      </div>

      <table className="mx-auto mb-5 box-border w-full max-w-[38rem] border-collapse border border-solid border-sub-color2">
        <thead className="flex w-full border-collapse  text-left text-sm font-semibold">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="flex w-full flex-nowrap whitespace-nowrap"
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
                className="flex w-full flex-nowrap whitespace-nowrap border-t border-solid border-sub-color2"
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
    </>
  );
};

export default IncomeTable;

const getCellWidth = (index: number) => {
  switch (index) {
    case 0:
      return 'w-52 truncate border-none flex-1';
    case 1:
      return 'w-[6.19rem] truncate';
    case 2:
      return 'w-[4.81rem]';
    case 3:
      return 'w-[5.12rem]';
    case 4:
      return 'w-20';
    case 5:
      return 'w-[53.34px]';
    default:
      return '';
  }
};
