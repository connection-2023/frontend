'use client';
import { ChangeImageSVG, CloseSVG, DeleteSVG, ProfileSVG } from '@/icons/svg';
import Image from 'next/image';

interface ProfileUpdateProps {
  profileImage: string | null;
}

const ProfileUpdate = ({ profileImage }: ProfileUpdateProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto bg-black/60 backdrop-blur-sm">
      <div className="absolute left-1/2 top-1/3 z-modal -translate-x-1/2 -translate-y-1/2 sm:top-1/2">
        <div className="relative h-[calc(100vw-1.6rem)] max-h-[21.56rem] w-[calc(100vw-1.6rem)] max-w-[21.56rem] sm:h-[21.56rem] sm:w-[21.56rem] ">
          {profileImage ? (
            <Image
              layout="fill"
              alt="프로필 사진"
              src={profileImage}
              sizes="(min-width: 744px) 345px, 345px"
              className="rounded-full border-2 border-black"
            />
          ) : (
            <div className="h-full w-full rounded-full bg-white">
              <ProfileSVG className="h-full w-full rounded-full border-2 border-black" />
            </div>
          )}
          <div className="group absolute -bottom-[50%] right-1/2 flex translate-x-1/2 items-center gap-3 sm:-bottom-10 sm:right-11 sm:translate-x-0">
            <button className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-vertical group-hover:shadow-[inset_0_0px_3px_1px_rgba(0,0,0,0.3)]">
              <CloseSVG
                width="21"
                height="21"
                className="stroke-black stroke-2"
              />
            </button>
            <label className="cursor-pointer text-white group-hover:font-semibold sm:hidden">
              편집 취소
            </label>
          </div>
          <div className="group absolute -bottom-1/3 right-1/2 flex translate-x-1/2 items-center gap-3 sm:-right-3 sm:bottom-0 sm:translate-x-0">
            <button className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-vertical group-hover:shadow-[inset_0_0px_3px_1px_rgba(0,0,0,0.3)]">
              <DeleteSVG width="28" height="28" className="stroke-black" />
            </button>
            <label className="cursor-pointer text-white group-hover:font-semibold sm:hidden">
              사진 삭제
            </label>
          </div>
          <div className="group absolute -bottom-[17%] right-1/2 flex translate-x-1/2 items-center gap-3 sm:-right-12 sm:bottom-14 sm:translate-x-0">
            <button className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-vertical group-hover:shadow-[inset_0_0px_3px_1px_rgba(0,0,0,0.3)]">
              <ChangeImageSVG className="h-7 w-7" />
            </button>
            <label className="cursor-pointer text-white group-hover:font-semibold sm:hidden">
              사진 변경
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
