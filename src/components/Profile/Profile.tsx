import Image from 'next/image';
import { ProfileSVG } from '../../../public/icons/svg';

interface ProfileProps {
  src?: string;
  nickname: string;
}

const commonProps = {
  width: 34,
  height: 34,
  className: 'mr-1.5 h-[2.125rem] w-[2.125rem] rounded-[2.125rem]',
};

const Profile = ({ src, nickname }: ProfileProps) => {
  return (
    <div className="color-inherit flex items-center text-sm">
      {src ? (
        <Image src={src} alt="프로필 사진" {...commonProps} />
      ) : (
        <ProfileSVG {...commonProps} />
      )}
      <span>{nickname}</span>
    </div>
  );
};

export default Profile;
