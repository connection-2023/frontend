'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useClickAway } from 'react-use';
import { ReportSVG, EditSVG, ShareSVG, OptionSVG } from '@/icons/svg';
import {
  instructorsBlock,
  instructorsLikeCancel,
} from '@/lib/apis/instructorLikesBlockApis';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import Modal from '../Modal/Modal';
import Sharing from '../Sharing/Sharing';
import { FetchError } from '@/types/types';

interface OptionButtonProps {
  lecturerId: number | string;
  title: string;
  mode: 'class' | 'instructor';
  likes?: boolean;
}

const OptionButtons = ({
  mode,
  lecturerId,
  title,
  likes,
}: OptionButtonProps) => {
  const pathname = usePathname();
  const loggedInUserType = useUserStore((state) => state.userType);
  const loggedInUser = useUserStore((state) => state.authUser);
  const [isOptionMenuOpened, setIsOptionMenuOpened] = useState(false);
  const [isSharingMenuOpened, setIsSharingMenuOpened] = useState(false);
  const optionButtonRef = useRef(null);
  const isWriter =
    Number(loggedInUser?.id) === Number(lecturerId) &&
    loggedInUserType === 'lecturer';

  useClickAway(optionButtonRef, () => {
    if (isOptionMenuOpened) setIsOptionMenuOpened(false);
  });

  const liStyles =
    'flex cursor-pointer items-center gap-1.5 px-2 hover:bg-gray-700 py-1.5';

  const instructorBlockHandler = async () => {
    try {
      await instructorsBlock(lecturerId);
      if (likes) {
        //추후 백엔드 likes 확인
        await instructorsLikeCancel(lecturerId);
      }
      toast.success('강사 차단 완료');
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await instructorBlockHandler();
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
    <div ref={optionButtonRef} className="relative flex items-center gap-2">
      <OptionSVG
        onClick={() => setIsOptionMenuOpened((prev) => !prev)}
        className={`peer cursor-pointer hover:fill-black ${
          isOptionMenuOpened ? 'fill-black' : 'fill-gray-500'
        }`}
      />

      {isOptionMenuOpened && (
        <ul className="absolute right-0 top-6 w-24 overflow-hidden whitespace-nowrap rounded-md bg-white text-sm font-medium text-black shadow-float">
          <li
            onClick={() => {
              setIsSharingMenuOpened(!isSharingMenuOpened);
            }}
            className={liStyles}
          >
            <ShareSVG width="14px" height="14px" className="fill-sub-color1" />
            공유하기
          </li>
          {isWriter ? (
            <li>
              <Link href={`${pathname}/edit`} className={liStyles}>
                <EditSVG
                  width="15px"
                  height="15px"
                  className="fill-sub-color1"
                />
                수정하기
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  href={`/report?targetLecturerId=${lecturerId}`}
                  className={liStyles}
                >
                  <ReportSVG
                    width="15px"
                    height="15px"
                    className="fill-sub-color1"
                  />
                  신고하기
                </Link>
              </li>
              <li className={liStyles} onClick={instructorBlockHandler}>
                <ReportSVG
                  width="15px"
                  height="15px"
                  className="fill-sub-color1"
                />
                차단하기
              </li>
            </>
          )}
        </ul>
      )}

      {isSharingMenuOpened && (
        <Modal
          isOpened={isSharingMenuOpened}
          handleClosed={() => {
            setIsSharingMenuOpened(false);
          }}
        >
          <Sharing mode={mode} header={title} />
        </Modal>
      )}
    </div>
  );
};

export default OptionButtons;
