'use client';
import Link from 'next/link';
import { useRouter } from 'next-nprogress-bar';
import React from 'react';
import AppliedList from './AppliedList';
import Button from '../Button/Button';
import ProfileImg from '../Profile/ProfileImage';
import { userPass } from '@/types/pass';

const UserPass = ({ passInfo }: { passInfo: userPass }) => {
  const router = useRouter();

  const {
    lecturerId,
    id,
    maxUsageCount,
    price,
    title,
    availableMonths,
    appliedList,
    profileCardImageUrl,
    nickname,
  } = passInfo;

  const moveInstructorPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.nativeEvent.preventDefault();
    router.push(`/instructor/${lecturerId}`);
  };

  return (
    <Link
      href={`/order/pass/${id}`}
      className="block rounded-md text-sm shadow-horizontal"
    >
      <div className="flex flex-col gap-1.5 p-3">
        <div className="mb-2 flex justify-between text-xl font-semibold">
          <dd className="flex w-1/2">
            <p className="truncate">{maxUsageCount}</p>회
          </dd>
          <dd className="flex w-1/2 flex-row-reverse">
            원<p className="truncate">{price.toLocaleString()}</p>
          </dd>
        </div>
        <dt className="truncate">{title}</dt>
        <dd>이용기간 {availableMonths}개월</dd>
        <div className="group w-fit">
          <AppliedList appliedList={appliedList} />
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-between p-3 [&>*:nth-child(2)]:w-20">
        {nickname ? (
          <button onClick={moveInstructorPage} className="group">
            <ProfileImg
              size="xsmall"
              src={profileCardImageUrl}
              nickname={nickname}
            />
          </button>
        ) : (
          <div />
        )}
        <Button>구매하기</Button>
      </div>
    </Link>
  );
};

export default UserPass;
