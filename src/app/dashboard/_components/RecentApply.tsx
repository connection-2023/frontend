import { RecentSVG } from '@/icons/svg';
import ProfileImg from '@/components/ProfileImage/ProfileImage';

const RecentApply = () => {
  return (
    <section className="flex h-[39.25rem] flex-col divide-y divide-solid divide-sub-color4 rounded-[0.31rem] bg-white shadow-float">
      <h1 className="flex h-12 w-full items-center justify-between px-3.5 text-base font-bold text-sub-color3">
        <span className="flex items-center gap-[0.38rem]">
          <RecentSVG width="24" height="24" className="fill-sub-color1" />
          최근 신청한 수강생
        </span>

        <span className="text-sm font-medium text-sub-color2">09:00AM</span>
      </h1>
      <ClassList />
      <ClassList />
      <ClassList />
      <ClassList />
      <ClassList />
    </section>
  );
};

export default RecentApply;

const ClassList = () => {
  return (
    <div className="flex h-[7.31rem] flex-col justify-center px-3.5 text-sm">
      <h2 className="mb-1 font-bold">가비쌤과 함께하는 왁킹 클래스</h2>
      <p className="font-medium text-sub-color1">
        23.08/04 <span>14:00-15:00</span>
      </p>
      <ul className="mt-2 flex items-center gap-2">
        <li>
          <ProfileImg size="small" src={null} label={false} />
        </li>
        <li>
          <ProfileImg size="small" src={null} label={false} />
        </li>
        <li>
          <ProfileImg size="small" src={null} label={false} />
        </li>
        <li>
          <ProfileImg size="small" src={null} label={false} />
        </li>
        <li>
          <ProfileImg size="small" src={null} label={false} />
        </li>
        <p className="text-base text-sub-color3">5/6</p>
      </ul>
    </div>
  );
};
