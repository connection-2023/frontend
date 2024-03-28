'use client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { dummyUserInfo } from '@/constants/dummy';
import { AlarmSVG, ChatSVG } from '@/icons/svg';
import { getOpponentInfo, getUnreadCount } from '@/lib/apis/chatApi';
import { useChatStore } from '@/store';
import ProfileImg from '@/components/Profile/ProfileImage';
import { userType } from '@/types/auth';
import { Chat, ChatRoom } from '@/types/chat';

interface NotificationIndicatorProps {
  id: string;
  userType: userType;
}

const NotificationIndicator = ({
  id,
  userType,
}: NotificationIndicatorProps) => {
  const [preview, setPreview] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { alarmCount } = dummyUserInfo;

  const { chatView, newChat, setChatView, setChatRoomSelect } = useChatStore(
    (state) => ({
      setChatView: state.setChatView,
      chatView: state.chatView,
      newChat: state.newChat,
      setChatRoomSelect: state.setChatRoomSelect,
    }),
  );

  const { data: chatCount } = useQuery({
    queryKey: ['commentCount'],
    queryFn: () => getUnreadCount(),
    staleTime: Infinity,
    refetchOnWindowFocus: 'always',
  });

  const userIdType = userType === 'user' ? 'userId' : 'lecturerId';
  const opponentType = userType === 'user' ? 'lecturer' : 'user';

  const startTimer = () => {
    timerRef.current = setTimeout(() => setPreview(false), 5000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const clickChatPreviewHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!newChat) return;
    setPreview(false);
    setChatView(true);

    const newChatRoom: ChatRoom = {
      id: newChat.chatRoomId,
      user: {
        id: newChat.receiver.userId || (newChat.sender.userId as number),
        participation: true,
      },
      lecturer: {
        id:
          newChat.receiver.lecturerId || (newChat.sender.lecturerId as number),
        participation: true,
      },
      lastChat: {
        ...newChat,
      },
    };

    setChatRoomSelect(newChatRoom);
  };

  useEffect(() => {
    if (newChat && newChat.receiver[userIdType] === Number(id)) {
      setPreview(true);
      startTimer();
    }

    return () => stopTimer();
  }, [newChat]);

  return (
    <>
      <button className="relative">
        <AlarmSVG className="fill-black pt-0.5" width="31" height="31" />
        <span className="absolute -right-1.5 top-0 min-w-[1rem] rounded-full bg-main-color px-1 text-xs font-bold text-white">
          {alarmCount}
        </span>
      </button>
      <button className="relative" onClick={() => setChatView(!chatView)}>
        <ChatSVG fill="black" width="29" height="30" />
        <motion.div layoutId="chat" />
        <span className="absolute -right-1.5 top-0 min-w-[1rem] rounded-full bg-main-color px-1 text-xs font-bold text-white">
          {chatCount ? (chatCount > 99 ? '99+' : chatCount) : ''}
        </span>
        {newChat && preview && !chatView && (
          <ChatPreview
            chat={newChat}
            opponentType={opponentType}
            startTimer={startTimer}
            stopTimer={stopTimer}
            onClick={clickChatPreviewHandler}
          />
        )}
      </button>
    </>
  );
};

export default NotificationIndicator;

interface ChatPreviewProps {
  chat: Chat;
  opponentType: userType;
  startTimer: () => void;
  stopTimer: () => void;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const ChatPreview = ({
  chat,
  opponentType,
  startTimer,
  stopTimer,
  onClick,
}: ChatPreviewProps) => {
  const opponentId = chat.sender[
    opponentType === 'lecturer' ? 'lecturerId' : 'userId'
  ] as number;

  const { data, isLoading } = useQuery({
    queryKey: ['opponentProfile', opponentType, opponentId],
    queryFn: () => getOpponentInfo(opponentType, opponentId),
    staleTime: Infinity,
  });

  return (
    <div
      onClick={onClick}
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
      className="absolute -bottom-36 right-0 grid h-[6.5rem] w-72 grid-rows-[auto_1fr] gap-y-2 rounded-md border border-solid border-main-color bg-white/90 p-3 backdrop-blur-3xl sm:-right-20"
    >
      <div className="grid grid-cols-[auto_1fr] items-center">
        {isLoading ? (
          <>
            <div className="mr-3 size-[34px] flex-shrink-0 animate-pulse rounded-full bg-gray-500" />
            <div className="h-4 w-14 animate-pulse bg-gray-500" />
          </>
        ) : (
          <>
            <ProfileImg src={data?.profilImg} size="small" />
            <div className="flex-grow truncate text-left font-bold">
              {data?.nickname}
            </div>
          </>
        )}
      </div>
      <p className="line-clamp-2 whitespace-pre-wrap text-left text-sm">
        {chat.imageUrl ? '이미지' : chat.content}
      </p>
    </div>
  );
};
