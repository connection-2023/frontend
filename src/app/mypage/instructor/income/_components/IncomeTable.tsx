import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { ReactNode, ChangeEvent } from 'react';
import { CSVLink } from 'react-csv';
import { PAYMENT_STATUS } from '@/constants/constants';
import { ExcelSVG, BillSVG } from '@/icons/svg';
import { formatShortDate } from '@/utils/dateTimeUtils';
import { Button } from '@/components/Button';
import PageSizeSelector from '@/components/Selector/PageSizeSelector';
import { ILecturerPayment } from '@/types/payment';

interface IncomeTableProps {
  data: ILecturerPayment[];
  selectedOption: string;
  displayCount: number;
  // eslint-disable-next-line no-unused-vars
  handleDisplayCount: (event: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
}

const IncomeTable = (props: IncomeTableProps) => {
  const { data, selectedOption, children, displayCount, handleDisplayCount } =
    props;

  const columns: ColumnDef<ILecturerPayment, any>[] = [
    {
      accessorKey: 'name',
      header: selectedOption === '전체' ? '클래스/패스권' : selectedOption,
      accessorFn: (row) => row.orderName,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'purchase',
      header: '구매자',
      accessorFn: (row) => row.user.nickname,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'date',
      accessorFn: (row) => formatShortDate(row.updatedAt),
      header: '판매일',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'price',
      accessorFn: (row) => row.finalPrice.toLocaleString(),
      header: '가격',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'status',
      accessorFn: (row) => PAYMENT_STATUS[row.paymentStatus.name],
      header: '상태',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'billing',
      header: '영수증',
      enableSorting: false,
      cell: () => (
        <button
          className="flex w-full items-center justify-center"
          aria-label="영수증 보기"
        >
          <BillSVG
            width="21"
            height="21"
            className="stroke-gray-100 hover:stroke-black"
          />
        </button>
      ),
    },
  ];

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
        {children}

        <div className="flex gap-2">
          <PageSizeSelector
            value={displayCount}
            onChange={handleDisplayCount}
          />

          <CSVLink
            data={exportToExcel()}
            filename="connection_수입관리.csv"
            className="flex"
          >
            <Button color="secondary" size="small">
              <p className="flex px-2 text-sm">
                <ExcelSVG width="20" height="20" />
                엑셀 다운로드
              </p>
            </Button>
          </CSVLink>
        </div>
      </div>

      <table className="mb-5 box-border min-h-72 w-full w-full border-collapse">
        <thead className="flex w-full border-collapse text-left text-sm font-semibold">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="flex w-full flex-nowrap justify-between whitespace-nowrap"
            >
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  className={`flex items-center justify-start px-2 py-3.5 ${getCellWidth(
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
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="flex w-full border-collapse flex-col text-left text-sm font-normal">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className="flex w-full flex-nowrap justify-between whitespace-nowrap border-t border-solid border-gray-700"
              >
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={`px-2 py-[0.81rem] ${getCellWidth(index)}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default IncomeTable;

const getCellWidth = (index: number) => {
  switch (index) {
    case 0:
      return 'w-44 truncate';
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
