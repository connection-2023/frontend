'use client';
import Link from 'next/link';
import { useState } from 'react';
import { dummyNotify } from '@/constants/dummy';
import {
  ReadMessageSVG,
  UnreadMessageSVG,
  DeleteSVG,
  ArrowUpSVG,
} from '@/icons/svg';
import ProfileImg from '@/components/ProfileImage/ProfileImage';
import { INoticeMessage } from '@/types/types';

const filterOptions = ['수강 클래스', '관심', '쿠폰/패스권', '신고'];

const NotifyPage = () => {
  const [activeTab, setActiveTab] = useState('');

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <section className="border-box mx-auto min-h-full w-full max-w-[40rem] max-w-[50rem] overflow-hidden px-[30px] font-semibold">
      <h1 className="mb-2 text-2xl">알림</h1>
      <ul className="flex gap-3 border-y border-solid border-gray-700 py-2 text-sm">
        {filterOptions.map((option) => (
          <li
            key={option}
            onClick={() => handleActiveTab(option)}
            className={`cursor-pointer rounded-md border border-solid border-sub-color1 px-[0.61rem] py-[0.31rem] ${
              activeTab === option
                ? 'bg-sub-color1 text-white'
                : 'text-sub-color1 hover:bg-sub-color1-transparent'
            }`}
          >
            {option}
          </li>
        ))}
      </ul>
      <ul className="flex w-full flex-col gap-[0.87rem] bg-sub-color1-transparent px-3 py-2">
        {dummyNotify.map((notify) => (
          <NotifyList
            key={notify.title}
            type={notify.type}
            id={notify.id}
            date={notify.date}
            isRead={notify.isRead}
            title={notify.title}
            contents={notify.contents}
          />
        ))}
      </ul>
    </section>
  );
};

export default NotifyPage;

interface NotifyListProps {
  type: string;
  id: string;
  date: string;
  isRead: boolean;
  title: string;
  contents: any;
}

const NotifyList = ({
  type,
  id,
  date,
  isRead,
  title,
  contents,
}: NotifyListProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpened = () => {
    setIsOpened((prev) => !prev);
  };

  const getStyle = (status: boolean) => {
    status ? '' : '';
  };

  return (
    <li className="flex h-full w-full flex-col rounded-lg bg-white px-4 py-3 text-sm font-medium shadow-float">
      <div className="mb-2 flex w-full items-center justify-between whitespace-nowrap">
        <div className="flex w-5/6 items-center gap-[0.88rem] font-semibold">
          {type === 'instructor' ? (
            <ProfileImg size="xsmall" src={null} nickname="강사 닉네임" />
          ) : (
            <Link href={id} className={`truncate ${isRead && 'text-gray-500'}`}>
              {title}
            </Link>
          )}
          <span className="flex items-center font-medium text-gray-500">
            {date}
            {contents.length > 1 && isOpened && (
              <ArrowUpSVG
                width="26"
                height="26"
                onClick={handleOpened}
                className="cursor-pointer fill-gray-100"
              />
            )}
          </span>
        </div>

        <button className="flex h-6 w-[3.75rem] cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-gray-700 text-gray-300 hover:text-black">
          전체삭제
        </button>
      </div>

      {!isOpened && (
        <p className={`${isRead && 'text-gray-500'}`}>{contents[0].message}</p>
      )}

      {!isOpened && contents.length > 1 && (
        <button
          onClick={handleOpened}
          className="mt-5 w-fit cursor-pointer text-sub-color1"
        >
          +{contents.length - 1} 알림 더보기
        </button>
      )}

      {/* 애니메이션 추후 추가 예정 */}
      {isOpened && (
        <ul className="flex flex-col gap-[0.63rem]">
          {contents.map((content: INoticeMessage, index: number) => (
            <li
              key={index + content.message}
              className="flex w-full items-center justify-between"
            >
              <p
                className={`flex items-center gap-2 ${
                  content.isRead ? 'text-gray-500' : 'text-black'
                }`}
              >
                {content.isRead ? (
                  <ReadMessageSVG
                    width="22"
                    height="22"
                    className="stroke-gray-500"
                  />
                ) : (
                  <UnreadMessageSVG
                    width="22"
                    height="22"
                    className="stroke-sub-color1"
                  />
                )}

                {content.message}
              </p>

              <span className="flex items-center gap-2 text-gray-500">
                {content.date}
                <DeleteSVG
                  width="22"
                  height="22"
                  className="cursor-pointer stroke-gray-500"
                />
              </span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
