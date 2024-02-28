'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import AppliedList from './AppliedList';
import Button from '../Button/Button';
import ProfileImg from '../Profile/ProfileImage';
import { userPass } from '@/types/pass';

const UserPass = ({ passInfo }: { passInfo: userPass }) => {
  const router = useRouter();

  return (
    <dl
      onClick={() => router.push(`/pass/${passInfo.id}/apply`)}
      className="cursor-pointer rounded-md text-sm shadow-horizontal"
    >
      <div className="flex flex-col gap-1.5 p-3">
        <div className="mb-2 flex justify-between text-xl font-semibold">
          <dd className="flex w-1/2">
            <p className="truncate">{passInfo.maxUsageCount}</p>회
          </dd>
          <dd className="flex w-1/2 flex-row-reverse">
            원<p className="truncate">{passInfo.price.toLocaleString()}</p>
          </dd>
        </div>
        <dt className="truncate">{passInfo.title}</dt>
        <dd>이용기간 {passInfo.availableMonths}개월</dd>
        <div className="group w-fit">
          <AppliedList appliedList={passInfo.appliedList} />
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-between p-3 [&>*:nth-child(2)]:w-20">
        <Link href={`/instructor/${passInfo.lecturerId}`} className="group">
          <ProfileImg
            size="xsmall"
            src={passInfo.profileCardImageUrl}
            nickname={passInfo.nickname}
          />
        </Link>
        <Button onClick={() => router.push(`/pass/${passInfo.id}/apply`)}>
          구매하기
        </Button>
      </div>
    </dl>
  );
};

export default UserPass;
