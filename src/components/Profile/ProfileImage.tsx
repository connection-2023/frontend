import Image from 'next/image';
import { ProfileImgSize } from '@/constants/constants';
import { ProfileSVG } from '@/icons/svg';

interface ProfileProps {
  src?: string | null;
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
  marginLeft = 3,
}: ProfileProps) => {
  const imageSize = ProfileImgSize[size];
  const ml = `ml-${marginLeft} group-hover:text-sub-color1`;

  return (
    <div className="color-inherit flex items-center">
      {src ? (
        <figure
          style={{ height: `${imageSize}px`, width: `${imageSize}px` }}
          className="overflow-hidden rounded-full"
        >
          <Image
            src={src}
            width={0}
            height={0}
            alt="프로필 사진"
            sizes="(max-width: 720px) 60vw, (max-width: 1440px) 30vw"
            className="object-cover"
            style={{ height: '100%', width: '100%' }}
          />
        </figure>
      ) : (
        <ProfileSVG
          width={imageSize}
          height={imageSize}
          className="rounded-full fill-gray-500 "
        />
      )}
      {label && <span className={ml}>{nickname}</span>}
    </div>
  );
};

export default ProfileImg;
