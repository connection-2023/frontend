import Image from 'next/image';
import { ProfileSVG } from '../../../public/icons/svg';

interface ProfileProps {
  src?: string;
  nickname: string;
  size: number;
}

const commonProps = {
  className: 'mr-1.5 rounded-[2.125rem]',
};

const Profile = ({ src, nickname, size }: ProfileProps) => {
  return (
    <div className="color-inherit flex items-center">
      {src ? (
        <Image
          src={src}
          width={size}
          height={size}
          alt="프로필 사진"
          {...commonProps}
        />
      ) : (
        <ProfileSVG width={size} height={size} {...commonProps} />
      )}
      <span>{nickname}</span>
    </div>
  );
};

export default Profile;
