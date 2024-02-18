'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChatSVG, ReportSVG } from '@/icons/svg';
import { useMemberStore } from '@/store/memberStore';
import { formatPhoneNumber } from '@/utils/parseUtils';
import ProfileImg from '@/components/Profile/ProfileImage';
import { GetMyMemberPassesData } from '@/types/instructor';

const Member = () => {
  const { memberInfo } = useMemberStore((state) => ({
    memberInfo: state.memberInfo,
  }));

  const router = useRouter();

  const [memo, setMemo] = useState<string>(memberInfo?.memo ?? '');

  useEffect(() => {
    if (!memberInfo) {
      router.push('/mypage/instructor/manage/member');
    }
  }, []);

  if (!memberInfo) return null;

  return (
    <div className="flex flex-col gap-5 sm:flex-row">
      <div className="flex">
        <div className="relative">
          <span className="absolute left-[93%] top-[47%] flex gap-1">
            <span className="h-1 w-32 bg-sub-color1-transparent" />
            <span className="h-1 w-1 bg-sub-color1-transparent" />
            <span className="h-1 w-1 bg-sub-color1-transparent" />
            <span className="h-1 w-1 bg-sub-color1-transparent" />
          </span>
          <ProfileImg src={memberInfo.userProfileImage} size="mlarge" />
        </div>
        <dl className="flex flex-col gap-1">
          <dt className="text-lg font-bold">{memberInfo.nickname}</dt>
          <dd className="mb-5 text-sm">
            {formatPhoneNumber(memberInfo.phoneNumber)}
          </dd>

          <button className="flex items-center gap-1">
            <ChatSVG fill="black" width="21" height="21" /> 채팅 보내기
          </button>
          <button className="flex items-center gap-1">
            <ReportSVG width="21" height="21" fill="black" />
            신고하기
          </button>
        </dl>
      </div>
      <div className="flex flex-grow flex-col gap-1 sm:ml-6">
        <h2 className="text-sm font-semibold">메모</h2>
        <textarea
          placeholder="강사가 작성하는 메모란으로 수강생에게는 보여지지 않습니다."
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="flex-grow resize-none border border-gray-500 p-3 text-sm focus:outline-sub-color1"
        />
      </div>
    </div>
  );
};

export default Member;
