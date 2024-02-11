import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { instructorsBlockCancel } from '@/lib/apis/instructorLikesBlockApis';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import ProfileImage from '@/components/Profile/ProfileImage';
import { InstructorBlock } from '@/types/instructor';
import { FetchError } from '@/types/types';

interface BlockedInstructorsProps {
  instructors: InstructorBlock[];
  blockListHandler: (cancelId: number) => void;
}

const BlockedInstructors = ({
  instructors,
  blockListHandler,
}: BlockedInstructorsProps) => {
  const blockCancel = async (cancelId: number) => {
    try {
      await instructorsBlockCancel(cancelId);
      blockListHandler(cancelId);
      toast.success('차단 취소 완료!');
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await instructorsBlockCancel(cancelId);
          } catch (error) {
            console.error(error);
          }
        } else {
          toast.error('잘못된 요청입니다!');
        }
      }
    }
  };

  return (
    <ul className="flex w-full min-w-[18.75rem] flex-col sm:w-5/12">
      {instructors.map(({ nickname, imgURL, id }, index) => {
        return (
          <li
            key={nickname + index}
            className="flex justify-between border-y border-solid border-gray-700 py-4"
          >
            <Link href={`/instructor/${id}`}>
              <ProfileImage
                size="small"
                src={imgURL[0]}
                nickname={nickname}
                marginLeft={2}
              />
            </Link>
            <div className="flex gap-8 text-gray-100 sm:gap-16">
              <button onClick={() => blockCancel(id)}>차단취소</button>
              <button>신고</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default BlockedInstructors;
