'use client';
import { useState } from 'react';
import { MEMBER_MANAGE_TAKE } from '@/constants/constants';
import { getMyMembers } from '@/lib/apis/instructorApi';
import usePageNation from '@/utils/usePagenation';
import FilterNav from './FilterNav';
import Pagination from '@/components/Pagination/Pagination';
import { OptionType } from '@/types/coupon';
import {
  GetMyMembersData,
  GetMyMembersParameter,
  MemberData,
} from '@/types/instructor';

interface MemberManageProps {
  myMembers: GetMyMembersData;
  myClassListsOption: OptionType[];
}

const MemberManage = ({ myMembers, myClassListsOption }: MemberManageProps) => {
  const { count: defaultItemCount, item } = myMembers;
  const [memberList, setMemberLsit] = useState(item);

  const changeMemberList = (members: MemberData[]) => {
    setMemberLsit(members);
  };

  const {
    filterState,
    handleChangePage,
    resetFilter,
    updateFilter,
    totalItemCount,
  } = usePageNation({
    defaultFilterState: {
      take: MEMBER_MANAGE_TAKE, // 10
      currentPage: 1,
      targetPage: 1,
      sortOption: 'LATEST',
      filterOption: 'ALL',
      lectureId: myClassListsOption[0]?.value ?? undefined,
    },
    firstPageIndex: 1,
    itemList: memberList,
    totalItemCount: defaultItemCount,
    changeItemListFn: changeMemberList,
    getItemListFn: (data: GetMyMembersParameter, signal: AbortSignal) =>
      getMyMembers(data, signal),
  });

  return (
    <main className="col-span-1 flex w-full flex-col px-2 sm:px-6">
      <section className="flex flex-col rounded-md bg-white pb-10 pt-6 shadow-horizontal">
        <header className="flex flex-col gap-3 border-b border-gray-700 px-5 pb-4">
          <h1 className="text-2xl font-bold">회원관리</h1>
          <FilterNav
            filterState={filterState}
            resetFilter={resetFilter}
            myClassListsOption={myClassListsOption}
          />
        </header>
        <div className="flex flex-col px-5 pt-3">
          <nav className="flex justify-between">
            <select
              name="sorting"
              className="h-7 outline outline-1 outline-gray-500 focus:outline-sub-color1"
              value={filterState.orderBy}
              onChange={(e) => updateFilter('sortOption', e.target.value)}
            >
              <option value="LATEST">오름차순</option>
              <option value="ASC">내림차순</option>
              <option value="HIGHEST_APPLICANTS">수강 횟수순</option>
            </select>

            <select
              name="sorting"
              className="h-7 outline outline-1 outline-gray-500 focus:outline-sub-color1"
              value={filterState.take}
              onChange={(e) => updateFilter('take', e.target.value)}
            >
              <option value="10">10줄</option>
              <option value="20">20줄</option>
              <option value="30">30줄</option>
            </select>
          </nav>
          <nav className="z-0">
            <Pagination
              pageCount={Math.ceil(
                totalItemCount /
                  (filterState?.take ? filterState.take : MEMBER_MANAGE_TAKE),
              )}
              currentPage={
                filterState.targetPage !== undefined &&
                filterState.targetPage > 0
                  ? filterState.targetPage - 1
                  : 0
              }
              onPageChange={handleChangePage}
            />
          </nav>
        </div>
      </section>
    </main>
  );
};

export default MemberManage;
