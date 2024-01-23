import Image from 'next/image';
import { ProfileImgSize } from '@/constants/constants';
import { ProfileSVG } from '@/icons/svg';

interface ProfileProps {
  src: string | null;
  nickname?: string;
  size: keyof typeof ProfileImgSize;
  label?: boolean;
  marginLeft?: number;
}

const ProfileImg = ({
  src,
  size,
  nickname = '',
  label = true,
  marginLeft = 1.5,
}: ProfileProps) => {
  const imageSize = ProfileImgSize[size];
  const height = `h-[${imageSize}px]`;
  const ml = `ml-${marginLeft}`;

  return (
    <div className={`color-inherit flex items-center ${height}`}>
      {src ? (
        <Image
          src={src}
          width={imageSize}
          height={imageSize}
          alt="프로필 사진"
          sizes="1x"
          priority={true}
          className="h-full rounded-full"
        />
      ) : (
        <ProfileSVG
          width={imageSize}
          height={imageSize}
          className="rounded-full"
        />
      )}
      {label && <span className={ml}>{nickname}</span>}
    </div>
  );
};

export default ProfileImg;
