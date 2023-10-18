import Image from 'next/image';
import { ProfileSVG } from '@/icons/svg';

interface ProfileProps {
  src: string | null;
  nickname: string;
  size: number;
  label?: boolean;
}

const commonProps = {
  className: 'rounded-[2.125rem]',
};

const Profile = ({ src, nickname, size, label = true }: ProfileProps) => {
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
      {label && <span className="ml-1.5">{nickname}</span>}
    </div>
  );
};

export default Profile;
