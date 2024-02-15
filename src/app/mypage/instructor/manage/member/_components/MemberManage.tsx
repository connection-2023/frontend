'use client';
import { useState } from 'react';
import { MEMBER_MANAGE_TAKE } from '@/constants/constants';
import { getMyMembers } from '@/lib/apis/instructorApi';
import usePageNation from '@/utils/usePagenation';
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
      take: 1, // 10
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
    <div>
      <div>{memberList[0].id}</div>
      <Pagination
        pageCount={Math.ceil(totalItemCount / MEMBER_MANAGE_TAKE)}
        currentPage={
          filterState.targetPage !== undefined && filterState.targetPage > 0
            ? filterState.targetPage - 1
            : 0
        }
        onPageChange={handleChangePage}
      />
    </div>
  );
};

export default MemberManage;
