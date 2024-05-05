import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next-nprogress-bar';
import React from 'react';
import { getOpponentInfo } from '@/lib/apis/chatApi';
import ProfileImg from '@/components/Profile/ProfileImage';
import { userType } from '@/types/auth';

const Profile = ({
  opponentType,
  opponentId,
}: {
  opponentType: userType;
  opponentId: number;
}) => {
  const router = useRouter();
  const {
    data: profileDate,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryKey: ['opponentProfile', opponentType, opponentId],
    queryFn: () => getOpponentInfo(opponentType, opponentId),
    staleTime: Infinity,
  });

  const href =
    opponentType === 'lecturer'
      ? `/instructor/${opponentId}`
      : `/mypage/instructor/manage/member/${opponentId}`;

  const moveProfileLink = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.nativeEvent.preventDefault();

    router.push(href);
  };

  return profileIsLoading || profileError ? (
    <div className="flex items-center">
      <div className="mr-3 size-[34px] flex-shrink-0 animate-pulse rounded-full bg-gray-700" />
      <div className="h-3 w-24 flex-grow animate-pulse bg-gray-700" />
    </div>
  ) : (
    <button
      onClick={moveProfileLink}
      className="group flex max-w-[6.5rem] items-center sm:max-w-[10rem]"
    >
      <ProfileImg src={profileDate?.profileImg} size="small" />
      <p className="flex-grow truncate group-hover:underline">
        {profileDate?.nickname}
      </p>
    </button>
  );
};

export default Profile;
