'use client';
import { dummyUserInfo } from '@/constants/dummy';
import { AlarmSVG, ChatSVG } from '@/icons/svg';
import { useSocketStore } from '@/store';

const NotificationIndicator = () => {
  const { alarmCount, commentCount } = dummyUserInfo;

  const { setChatView } = useSocketStore((state) => ({
    setChatView: state.setChatView,
  }));

  return (
    <>
      <button className="relative">
        <AlarmSVG className="fill-black pt-0.5" width="31" height="31" />
        <span className="absolute -right-1.5 top-0 min-w-[1rem] rounded-full bg-main-color px-1 text-xs font-bold text-white">
          {alarmCount}
        </span>
      </button>
      <button className="relative" onClick={() => setChatView(true)}>
        <ChatSVG fill="black" width="29" height="30" />
        <span className="absolute -right-1.5 top-0 min-w-[1rem] rounded-full bg-main-color px-1 text-xs font-bold text-white">
          {commentCount}
        </span>
      </button>
    </>
  );
};

export default NotificationIndicator;
