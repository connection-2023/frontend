import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Spinner from '@/components/Loading/Spinner';
import UserProfileMenu from '@/components/Profile/UserProfileMenu';
import { IScheduleLearnerList } from '@/types/class';
import ErrorFallback from '@/app/_components/Error';
import { ChatSVG } from '@/icons/svg';
import {
  getAllRegisterLists,
  getScheduleRegisterLists,
} from '@/lib/apis/classApis';

interface ClassOverViewProps {
  totalClassNum: number;
  pastClassNum: number;
  selectedClass: { index: number | null; id: number | null };
  lectureId: string;
}

const ClassOverview = ({
  totalClassNum,
  pastClassNum,
  selectedClass,
  lectureId,
}: ClassOverViewProps) => {
  const fetchRegisterList = async () => {
    if (selectedClass.id) {
      const registerData = await getScheduleRegisterLists(selectedClass.id);
      return registerData;
    } else {
      const allLearnersData = await getAllRegisterLists(lectureId, 100, 0);
      return allLearnersData;
    }
  };
  const {
    data: registerList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['registerList', lectureId, selectedClass.id],
    queryFn: fetchRegisterList,
    refetchOnWindowFocus: 'always',
  });

  if (!registerList || registerList instanceof Error || error)
    return (
      <aside className="flex h-fit flex-col whitespace-nowrap rounded-lg bg-white p-4 font-medium shadow-float shadow-float">
        <ErrorFallback />
      </aside>
    );

  return (
    <aside className="flex h-fit flex-col whitespace-nowrap rounded-lg bg-white shadow-float shadow-float ">
      <div className="flex h-[5.13rem] divide-x  divide-solid divide-gray-700 border-b border-solid border-gray-700 py-[0.69rem] text-sm font-semibold text-gray-100">
        <div className="flex w-1/2 items-center justify-center gap-2.5 lg:flex-col lg:gap-0">
          진행한 클래스
          <span className="text-xl font-bold text-sub-color1">
            {pastClassNum}회
          </span>
        </div>
        <div className="flex w-1/2 items-center justify-center gap-2.5 lg:flex-col lg:gap-0">
          총 클래스
          <span className="text-xl font-bold text-gray-100">
            {totalClassNum}회
          </span>
        </div>
      </div>
      <div className="flex flex-col px-[1.31rem] py-[0.81rem]">
        <h3 className="flex items-center justify-between text-lg font-semibold">
          {selectedClass.index === null
            ? '전체 수강생 리스트'
            : `${selectedClass.index}회차 수강생 리스트`}

          <button
            aria-label="전체 채팅"
            className="flex h-[1.75rem] w-[5.5625rem] items-center justify-center gap-[0.13rem] rounded-[0.3125rem] bg-black text-sm text-white"
          >
            <ChatSVG width="16" height="17" fill="white" />
            전체 채팅
          </button>
        </h3>
        {isLoading ? (
          <div className="mb-auto mt-5 flex h-fit items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <ul className="grid w-full grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-1">
            {registerList.map((item, index) => (
              <LearnerList key={index} {...item} />
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default ClassOverview;

const LearnerList = (props: IScheduleLearnerList) => {
  const { userId, nickname, userProfileImage, enrollmentCount } = props;

  return (
    <li className="flex w-full items-center justify-between text-sm font-medium">
      <div className="flex cursor-pointer items-center">
        <UserProfileMenu
          contact="" // api 변경 후 추가 예정
          userId={userId}
          profileImg={userProfileImage}
          name={nickname}
        />
      </div>
      <div className="flex items-center gap-4 text-sub-color1">
        {enrollmentCount && <span>{enrollmentCount}회 신청</span>}

        <Link href={`/chat/${userId}`} aria-label="개인 채팅">
          <ChatSVG
            width="29"
            height="30"
            fill="black"
            className="cursor-pointer"
          />
        </Link>
      </div>
    </li>
  );
};
