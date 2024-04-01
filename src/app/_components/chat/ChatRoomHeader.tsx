import {
  UseQueryResult,
  useMutation,
  useQueries,
  useQueryClient,
} from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import ko from 'date-fns/locale/ko';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { OptionSVG } from '@/icons/svg';
import { exitChatRoom, getCheckOnline } from '@/lib/apis/chatApi';
import { getLastEnrolledClass } from '@/lib/apis/classApi';
import { useChatStore } from '@/store';
import Dropdown from '@/components/Dropdown/Dropdown';
import ProfileImg from '@/components/Profile/ProfileImage';
import { userType } from '@/types/auth';
import { ChatRoom, OpponentInfo } from '@/types/chat';

interface ChatRoomHeaderProps {
  selectChatRoom: ChatRoom;
  opponentType: userType;
  opponentProfile: UseQueryResult<OpponentInfo, Error>;
}

const ChatRoomHeader = ({
  opponentType,
  selectChatRoom,
  opponentProfile,
}: ChatRoomHeaderProps) => {
  const [optionView, setOptionView] = useState(false);
  const optionRef = useRef(null);

  useClickAway(optionRef, () => {
    setOptionView(false);
  });

  const queryClient = useQueryClient();

  const { setChatRoomSelect, setChatView } = useChatStore((state) => ({
    setChatRoomSelect: state.setChatRoomSelect,
    setChatView: state.setChatView,
  }));

  const {
    data: profileDate,
    isLoading: profileIsLoading,
    error: profileError,
  } = opponentProfile;

  const [
    { data: onlineState, isLoading: onlineIsLoading, error: onlineError },
    { data: lastClass, isLoading: lastClassIsLoading, error: lastClassError },
  ] = useQueries({
    queries: [
      {
        queryKey: [
          'onlineState',
          opponentType,
          selectChatRoom[opponentType].id,
        ],
        queryFn: () =>
          getCheckOnline(opponentType, selectChatRoom[opponentType].id),
        refetchOnWindowFocus: 'always',
      },
      {
        queryKey: ['lastClass', opponentType, selectChatRoom[opponentType].id],
        queryFn: () => getLastEnrolledClass(selectChatRoom[opponentType].id),
      },
    ],
  });

  const { mutate: exitChatRoomFn } = useMutation({
    mutationFn: () => exitChatRoom(selectChatRoom.id),
    onSuccess: (selectChatRoom) => {
      queryClient.setQueryData<ChatRoom[]>(
        [
          'chatRoomList',
          selectChatRoom[opponentType === 'lecturer' ? 'user' : 'lecturer'].id,
        ],
        (oldData) => {
          if (!oldData) return oldData;

          return oldData.filter(
            (chatRoom) => chatRoom.id !== selectChatRoom.id,
          );
        },
      );

      setChatRoomSelect(null);
    },
  });

  const exitChatRoomHandler = () => {
    if (confirm('채팅방을 나가시겠습니까?')) {
      exitChatRoomFn();
    }
  };

  return (
    <header className="flex px-[10px] py-3">
      <div className="flex w-full justify-between">
        <div className="flex w-full items-center">
          {profileIsLoading || profileError ? (
            <div className="mr-3 size-[34px] flex-shrink-0 animate-pulse rounded-full bg-gray-700" />
          ) : (
            <Link
              href={
                opponentType === 'lecturer'
                  ? `/instructor/${selectChatRoom[opponentType].id}`
                  : `/mypage/instructor/manage/member/${selectChatRoom[opponentType].id}`
              }
            >
              <ProfileImg src={profileDate?.profileImg} size="small" />
            </Link>
          )}
          <dl className="grid flex-grow grid-rows-2 text-sm">
            {profileIsLoading || profileError ? (
              <div className="mb-2 h-3 w-full animate-pulse bg-gray-700" />
            ) : (
              <Link
                className="w-full truncate"
                href={
                  opponentType === 'lecturer'
                    ? `/instructor/${selectChatRoom[opponentType].id}`
                    : `/mypage/instructor/manage/member/${selectChatRoom[opponentType].id}`
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
                  component: (
                    <Link
                      href={`/report?targetUserId=${selectChatRoom[opponentType].id}`}
                    >
                      신고하기
                    </Link>
                  ),
                  onClick: () => setChatView(false),
                },
                {
                  component: <div>채팅방 나가기</div>,
                  onClick: exitChatRoomHandler,
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
