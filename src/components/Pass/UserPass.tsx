import React from 'react';
import AppliedList from './AppliedList';
import { userPass } from '@/types/pass';

const UserPass = ({ passInfo }: { passInfo: userPass }) => {
  return (
    <dl className="cursor-pointer rounded-md text-sm shadow-horizontal">
      <div className="flex flex-col p-3">
        <div className="flex justify-between text-xl font-semibold">
          <dd>{passInfo.maxUsageCount}회</dd>
          <dd>{passInfo.price.toLocaleString()}원</dd>
        </div>
        <dt>{passInfo.title}</dt>
        <dd>{passInfo.availableMonths}개월</dd>
        <AppliedList appliedList={passInfo.appliedList} />
      </div>
      <hr />
      <div className="flex justify-between p-3">img btn</div>
    </dl>
  );
};

export default UserPass;
