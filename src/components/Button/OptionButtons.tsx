'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import Modal from '../Modal/Modal';
import Sharing from '../Sharing/Sharing';
import { ReportSVG, EditSVG, ShareSVG, OptionSVG } from '@/icons/svg';
import { useUserStore } from '@/store';

interface OptionButtonProps {
  lecturerId: number | string;
  title: string;
  mode: 'class' | 'instructor';
}

const OptionButtons = ({ mode, lecturerId, title }: OptionButtonProps) => {
  const loggedInUserType = useUserStore((state) => state.userType);
  const loggedInUser = useUserStore((state) => state.authUser);
  const [isOptionMenuOpened, setIsOptionMenuOpened] = useState(false);
  const [isSharingMenuOpened, setIsSharingMenuOpened] = useState(false);
  const optionButtonRef = useRef(null);
  const isWriter =
    Number(loggedInUser?.id) === lecturerId && loggedInUserType === 'lecturer';

  useClickAway(optionButtonRef, () => {
    if (isOptionMenuOpened) setIsOptionMenuOpened(false);
  });

  const liStyles =
    'flex cursor-pointer items-center gap-1.5 px-2 hover:bg-gray-700 py-1.5';

  return (
    <div ref={optionButtonRef} className="relative flex items-center gap-2">
      <OptionSVG
        onClick={() => setIsOptionMenuOpened((prev) => !prev)}
        className={`peer cursor-pointer hover:fill-black ${
          isOptionMenuOpened ? 'fill-black' : 'fill-gray-500'
        }`}
      />

      {isOptionMenuOpened && (
        <ul className="absolute top-6 w-[5.3rem] overflow-hidden whitespace-nowrap rounded-md bg-white text-sm font-medium text-black shadow-float">
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
            <li className={liStyles}>
              <EditSVG width="15px" height="15px" className="fill-sub-color1" />
              수정하기
            </li>
          ) : (
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
