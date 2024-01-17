import Link from 'next/link';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useClickAway } from 'react-use';
import Dropdown from '@/components/Dropdown/Dropdown';
import ProfileImg from '@/components/ProfileImage/ProfileImage';
import { IReservation } from '@/types/class';

interface ApplicantProfileProps {
  user: {
    id: number;
    nickname: string;
    userProfileImage: string | null;
  };
  reservation: IReservation[];
}

const ApplicantProfile = ({ user, reservation }: ApplicantProfileProps) => {
  const [isProfileMenuOpened, setIsProfileMenuOpened] = useState(false);
  const listRef = useRef(null);

  useClickAway(listRef, () => {
    setIsProfileMenuOpened(false);
  });

  const handleCopyPhoneNumber = () => {
    navigator.clipboard.writeText(reservation[0].phoneNumber).then(() => {
      toast.success('연락처가 복사되었습니다!');
    });
  };

  const profileOptions = [
    {
      component: <p>연락처 복사</p>,
      onClick: handleCopyPhoneNumber,
    },
    {
      component: <Link href={`/chat/${user.id}`}>채팅하기</Link>,
    },
    {
      component: <Link href={`/report?targetUserId=${user.id}`}>신고하기</Link>,
    },
    {
      // 추후 연결 필요
      component: <p>차단하기</p>,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <ProfileImg size="small" src={user.userProfileImage} label={false} />
      <div className="relative" ref={listRef}>
        <button onClick={() => setIsProfileMenuOpened(!isProfileMenuOpened)}>
          {reservation[0].representative}
        </button>

        {isProfileMenuOpened && (
          <Dropdown
            options={profileOptions}
            className="left-0 top-6 whitespace-nowrap text-base"
          />
        )}
      </div>
    </div>
  );
};

export default ApplicantProfile;
