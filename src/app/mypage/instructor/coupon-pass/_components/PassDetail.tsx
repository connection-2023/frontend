import { useQuery } from '@tanstack/react-query';
import {
  Column,
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { dummyPassTableData } from '@/constants/dummy';
import { ArrowRightSVG } from '@/icons/svg';
import { getSalesStatusPass } from '@/lib/apis/passApis';
import formatDate from '@/utils/formatDate';
import Button from '@/components/Button/Button';
import InstructorPass from '@/components/Pass/InstructorPass';
import ProfileImg from '@/components/Profile/ProfileImage';
import { IpassData, IpassTable } from '@/types/pass';

interface PassDetailProps {
  passInfo: IpassData;
  selectPassHandler: (data: IpassData | null) => void;
}

const PassDetail = ({ passInfo, selectPassHandler }: PassDetailProps) => {
  const initialized = useRef(false);

  const { data, isLoading } = useQuery({
    queryKey: ['instructor', 'pass'],
    queryFn: async () => {
      const passSituation = await getSalesStatusPass(passInfo.id);

      if (passSituation.length === 0) {
        return [];
      }

      return passSituation.flatMap((passInfo) => {
        const { startAt, endAt, remainingUses, createdAt } = passInfo.userPass;

        const data = {
          ...passInfo,
          classList:
            passInfo.reservations?.map(({ lecture }) => lecture.title) ?? [],
          count: remainingUses,
          purchase_date: createdAt,
          startAt,
          endAt,
        };

        return data;
      });
    },
  });

  const pathname = usePathname();

  useEffect(() => {
    if (!initialized.current) {
      window.history.pushState(null, '', `${pathname}?state=pass`);

      window.onpopstate = () => {
        selectPassHandler(null);
      };

      initialized.current = true;
      return;
    }

    return () => {
      window.onpopstate = null;
    };
  }, []);

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
    [],
  );

  const tableData = data || [];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <header className="mb-4 flex items-center justify-between border-b border-solid border-gray-700 p-5">
        <div className="flex text-2xl font-bold">
          <button onClick={() => window.history.back()}>
            <ArrowRightSVG className="h-8 w-8 rotate-180 stroke-black " />
          </button>
          패스권 현황
        </div>
        <div className="w-28">
          <Button color="secondary" size="small">
            판매 중지
          </Button>
        </div>
      </header>

      <div className="flex flex-col-reverse items-center gap-5 px-5 pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-0 sm:py-2">
        <dl className="grid flex-grow grid-cols-[1fr,5fr] gap-x-6 gap-y-2 truncate text-sm sm:gap-x-11">
          <dt className="font-semibold text-gray-300">패스권 명칭</dt>
          <dd className="truncate">{passInfo.title}</dd>
          <dt className="font-semibold text-gray-300">적용된 클래스</dt>
          <dd>
            <ul className="flex flex-col">
              {passInfo.lecturePassTarget.map(({ lecture }) => (
                <li key={lecture.id} className="group">
                  <Link
                    href={`/class/${lecture.id}`}
                    className="group-hover:text-sub-color1"
                  >
                    {lecture.title}
                  </Link>
                </li>
              ))}
            </ul>
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

      <div className="flex flex-col px-2 py-5 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center whitespace-nowrap">
            <p className="font-semibold">총 판매량</p>
            <p className="ml-2 font-semibold sm:text-lg sm:text-main-color">
              {data?.length ?? 0}매
            </p>
            <div className="ml-4 flex items-center gap-1">
              <input
                id="inUse"
                type="checkbox"
                className="peer mr-1 h-7 w-[1.12rem] accent-sub-color1"
              />
              <label
                htmlFor="inUse"
                className="cursor-pointer select-none text-gray-500 peer-checked:text-black"
              >
                현재 이용중
              </label>
            </div>
          </div>

          <select className="h-7 w-[5.75rem] border border-solid border-gray-500">
            <option value={10}>10개</option>
            <option value={20}>20개</option>
            <option value={30}>30개</option>
          </select>
        </div>

        {isLoading && !data ? (
          <div>기달려</div>
        ) : (
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
              {table.getRowModel().rows.map((row, index) => (
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default PassDetail;
