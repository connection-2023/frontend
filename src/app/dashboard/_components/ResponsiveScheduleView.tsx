import Link from 'next/link';
import { ClassStatusSVG } from '@/icons/svg';

const ResponsiveScheduleView = () => {
  return (
    <ul className="flex flex-col gap-4">
      <ScheduleList
        status="private"
        time="09:00-09:50"
        title="리아킴과 함께하는 댄스클래스"
      />
      <ScheduleList
        status="group"
        time="12:00-12:50"
        title="리아킴과 함께하는 댄스클래스"
      />
      <ScheduleList
        status="full"
        time="18:00-18:50"
        title="리아킴과 함께하는 댄스클래스"
      />
    </ul>
  );
};

interface ScheduleListProps {
  status: 'private' | 'group' | 'full';
  time: string;
  title: string;
}
// API 연결하면서 위 컴포넌트 안으로 이동 예정
const ScheduleList = ({ status, time, title }: ScheduleListProps) => {
  const statusColor = {
    private: 'fill-sub-color1',
    group: 'fill-main-color',
    full: 'fill-sub-color2',
  };

  return (
    <li className="flex flex-col text-sm">
      <p className="mb-2 flex items-center gap-1 whitespace-nowrap font-semibold">
        <ClassStatusSVG
          width="11"
          height="11"
          className={statusColor[status]}
        />
        {time}
      </p>
      <Link href="/id" className="font-medium">
        {title}
      </Link>
    </li>
  );
};

export default ResponsiveScheduleView;
