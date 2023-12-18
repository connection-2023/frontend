import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProfileImage from '@/components/ProfileImage/ProfileImage';
import { IRegisterLists } from '@/types/class';
import { CommentSVG } from '@/icons/svg';
import { getRegisterLists } from '@/lib/apis/classApis';

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
  const [registerList, setRegisterList] = useState<IRegisterLists[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedClass.id) {
        const registerData = await getRegisterLists(
          lectureId,
          selectedClass.id,
        );
        console.log(registerData);
        setRegisterList(registerData);
      }
    };

    fetchData();
  }, [selectedClass.id]);

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
            <CommentSVG width="16" height="17" fill="white" />
            전체 채팅
          </button>
        </h3>
        <ul className="grid w-full grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-1">
          {registerList.map((item, index) => (
            <ClassRoster key={index} {...item} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ClassOverview;

interface IClassRoster extends IRegisterLists {
  applyCount?: number;
}

const ClassRoster = ({
  nickname,
  userProfileImage,
  applyCount,
}: IClassRoster) => {
  const { userId, imageUrl } = userProfileImage;

  return (
    <li className="flex w-full items-center justify-between text-sm font-medium">
      <div className="flex cursor-pointer items-center">
        <ProfileImage src={imageUrl} label={false} size="small" />
        <span className="w-25 ml-2.5 truncate">{nickname}</span>
      </div>
      <div className="flex items-center gap-4 text-sub-color1">
        {applyCount && <span>{applyCount}회 신청</span>}

        <Link href={`/chat/${userId}`} aria-label="개인 채팅">
          <CommentSVG
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
