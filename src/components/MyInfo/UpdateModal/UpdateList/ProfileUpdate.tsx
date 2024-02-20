'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { ChangeImageSVG, CloseSVG, DeleteSVG, ProfileSVG } from '@/icons/svg';
import { deleteImage, postSingleImage } from '@/lib/apis/imageApi';
import { updateInstructor } from '@/lib/apis/instructorPostApis';
import { updateMyProfile } from '@/lib/apis/userApi';
import { useUserStore } from '@/store';

interface ProfileUpdateProps {
  profileImage: string | null;
  closeEvent: () => void;
}

const ProfileUpdate = ({ profileImage, closeEvent }: ProfileUpdateProps) => {
  const { setAuthUserField, userType } = useUserStore((state) => ({
    setAuthUserField: state.setAuthUserField,
    userType: state.userType,
  }));
  const [beforeImage, setBeforeImage] = useState<string | null>(profileImage);
  const modalRef = useRef(null);
  const fileChangeRef = useRef<HTMLInputElement>(null);

  useClickAway(modalRef, () => {
    closeEvent();
  });

  const deleteProfile = () => {};

  const changeProfileClick = () => {
    if (fileChangeRef.current) {
      fileChangeRef.current.click();
    }
  };

  const changeProfile = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    try {
      if (files && files.length > 0) {
        const imageUrl = await postSingleImage(files[0], 'lecturer');
        setBeforeImage(imageUrl);
        setAuthUserField('profileImage', imageUrl);
        if (beforeImage) {
          await deleteImage({ imageUrl: beforeImage });
        }
        if (userType === 'lecturer') {
          await updateInstructor({ profileCardImageUrl: imageUrl });
        } else {
          await updateMyProfile({ imageUrl });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto bg-black/60 backdrop-blur-sm">
      <div className="absolute left-1/2 top-1/3 z-modal -translate-x-1/2 -translate-y-1/2 sm:top-1/2">
        <motion.div
          ref={modalRef}
          layoutId="profile"
          className="relative h-[calc(100vw-1.6rem)] max-h-[21.56rem] w-[calc(100vw-1.6rem)] max-w-[21.56rem] sm:h-[21.56rem] sm:w-[21.56rem] "
        >
          {beforeImage ? (
            <button onClick={changeProfileClick}>
              <Image
                layout="fill"
                alt="프로필 사진"
                src={beforeImage}
                sizes="(min-width: 744px) 345px, 345px"
                priority={true}
                className="rounded-full border-2 border-black"
              />
            </button>
          ) : (
            <button
              onClick={changeProfileClick}
              className="h-full w-full rounded-full bg-white"
            >
              <ProfileSVG className="h-full w-full rounded-full border-2 border-black" />
            </button>
          )}
          <ButtonGroup
            icon={CloseSVG}
            label="편집 취소"
            positionClasses="-bottom-[50%] right-1/2 sm:-bottom-10 sm:right-11"
            iconProps={{
              width: '21',
              height: '21',
              className: 'stroke-black stroke-2',
            }}
            clickEvent={closeEvent}
            layoutId="cansel"
          />
          <ButtonGroup
            icon={DeleteSVG}
            label="사진 삭제"
            positionClasses="-bottom-1/3 right-1/2 sm:-right-3 sm:bottom-0"
            iconProps={{ width: '28', height: '28', className: 'stroke-black' }}
            clickEvent={deleteProfile}
            layoutId="delete"
          />
          <ButtonGroup
            icon={ChangeImageSVG}
            label="사진 변경"
            positionClasses="-bottom-[17%] right-1/2 sm:-right-12 sm:bottom-14"
            iconProps={{ className: 'h-7 w-7' }}
            clickEvent={changeProfileClick}
            layoutId="change"
          />
        </motion.div>
      </div>
      <input
        type="file"
        ref={fileChangeRef}
        id="image-upload"
        accept="image/*"
        className="hidden"
        onChange={changeProfile}
      />
    </div>
  );
};

interface ButtonGroupProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  positionClasses: string;
  iconProps: React.SVGProps<SVGSVGElement>;
  clickEvent: () => void;
  layoutId: string;
}

const ButtonGroup = ({
  icon: Icon,
  label,
  positionClasses,
  iconProps,
  clickEvent,
  layoutId,
}: ButtonGroupProps) => {
  return (
    <motion.div
      layoutId={layoutId}
      className={`group absolute ${positionClasses} flex translate-x-1/2 items-center gap-3 sm:translate-x-0`}
    >
      <button
        onClick={clickEvent}
        className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-vertical group-hover:shadow-[inset_0_0px_3px_1px_rgba(0,0,0,0.3)]"
      >
        <Icon {...iconProps} />
      </button>
      <label className="cursor-pointer text-white group-hover:font-semibold sm:hidden">
        {label}
      </label>
    </motion.div>
  );
};

export default ProfileUpdate;
