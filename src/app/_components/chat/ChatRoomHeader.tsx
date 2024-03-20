import { useQueries } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import ko from 'date-fns/locale/ko';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { OptionSVG } from '@/icons/svg';
import { getCheckOnline, getOpponentInfo } from '@/lib/apis/chatApi';
import { getLastEnrolledClass } from '@/lib/apis/classApi';
import Dropdown from '@/components/Dropdown/Dropdown';
import ProfileImg from '@/components/Profile/ProfileImage';
import { ChatRoom } from '@/types/chat';

interface ChatRoomHeaderProps {
  selectChatRoom: ChatRoom;
  opponentType: 'lecturerId' | 'userId';
}

const ChatRoomHeader = ({
  opponentType,
  selectChatRoom,
}: ChatRoomHeaderProps) => {
  const [optionView, setOptionView] = useState(false);
  const optionRef = useRef(null);

  useClickAway(optionRef, () => {
    setOptionView(false);
  });

  const [
    { data: onlineState, isLoading: onlineIsLoading, error: onlineError },
    { data: profileDate, isLoading: profileIsLoading, error: profileError },
    { data: lastClass, isLoading: lastClassIsLoading, error: lastClassError },
  ] = useQueries({
    queries: [
      {
        queryKey: ['onlineState', opponentType, selectChatRoom[opponentType]],
        queryFn: () =>
          getCheckOnline(opponentType, selectChatRoom[opponentType]),
      },
      {
        queryKey: ['chatRoomInfo', opponentType, selectChatRoom[opponentType]],
        queryFn: () =>
          getOpponentInfo(opponentType, selectChatRoom[opponentType]),
      },
      {
        queryKey: ['lastClass', opponentType, selectChatRoom[opponentType]],
        queryFn: () => getLastEnrolledClass(selectChatRoom[opponentType]),
      },
    ],
  });

  return (
    <header className="flex px-[10px] py-3">
      <div className="flex w-full justify-between">
        <div className="flex w-full items-center">
          {profileIsLoading || profileError ? (
            <div className="mr-3 size-[34px] flex-shrink-0 animate-pulse rounded-full bg-gray-700" />
          ) : (
            <Link
              href={
                opponentType === 'lecturerId'
                  ? `/instructor/${selectChatRoom[opponentType]}`
                  : `/mypage/instructor/manage/member/${selectChatRoom[opponentType]}`
              }
            >
              <ProfileImg src={profileDate?.profilImg} size="small" />
            </Link>
          )}
          <dl className="grid flex-grow grid-rows-2 text-sm">
            {profileIsLoading || profileError ? (
              <div className="h-3 w-full animate-pulse bg-gray-700" />
            ) : (
              <Link
                className="w-full truncate"
                href={
                  opponentType === 'lecturerId'
                    ? `/instructor/${selectChatRoom[opponentType]}`
                    : `/mypage/instructor/manage/member/${selectChatRoom[opponentType]}`
                }
              >
                <dt>{profileDate?.nickname}</dt>
              </Link>
            )}
            <div className="grid w-full grid-cols-[9px_auto_1fr] items-center gap-x-1">
              {onlineIsLoading || onlineError ? (
                <>
                  <div className="size-[9px] animate-pulse rounded-full bg-gray-700" />
                  <div className="h-full w-12 animate-pulse bg-gray-700" />
                </>
              ) : (
                <>
                  <div
                    className={`size-[9px] rounded-full ${
                      !onlineState ? 'bg-main-color' : 'bg-gray-500'
                    }`}
                  />
                  <dd
                    className={`mr-1 ${
                      !onlineState ? 'text-main-color' : 'text-gray-500'
                    }`}
                  >
                    {!onlineState
                      ? '활동중'
                      : formatDistanceToNow(new Date(onlineState), {
                          addSuffix: true,
                          locale: ko,
                        })}
                  </dd>
                </>
              )}
              {lastClassIsLoading || lastClassError ? (
                <div className="h-full w-full animate-pulse bg-gray-700" />
              ) : (
                lastClass?.lecture.title && (
                  <dd className="grid w-full grid-cols-[auto_1fr] text-main-color">
                    <Link
                      href={`/class/${lastClass.lecture.id}`}
                      className="truncate"
                    >{`'${lastClass.lecture.title}`}</Link>
                    <span className="whitespace-nowrap">{`' 수강`}</span>
                  </dd>
                )
              )}
            </div>
          </dl>
        </div>
        <button
          ref={optionRef}
          onClick={() => setOptionView((prev) => !prev)}
          className="relative self-end"
        >
          <OptionSVG
            className={`peer rotate-90 cursor-pointer hover:fill-black ${
              optionView ? 'fill-black' : 'fill-gray-500'
            }`}
          />
          {optionView && (
            <Dropdown
              className="right-0 w-[8.5rem]"
              options={[
                {
                  component: <Link href="/instructor/">신고하기</Link>,
                },
                {
                  component: <div>채팅방 나가기</div>,
                },
              ]}
            />
          )}
        </button>
      </div>
    </header>
  );
};

export default ChatRoomHeader;
