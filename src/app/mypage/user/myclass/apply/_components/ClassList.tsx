import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ButtonStyles } from '@/constants/constants';
import { formatShortDate } from '@/utils/dateTimeUtils';
import CancelModal from './CancelModal';
import UniqueButton from '@/components/Button/UniqueButton';
import ProfileImage from '@/components/Profile/ProfileImage';
import { IUserApplyClass } from '@/types/class';

interface IClassList extends IUserApplyClass {
  activeTab: '진행중/예정' | '수강 완료';
}

const ClassList = ({ activeTab, schedules, lecture }: IClassList) => {
  const { title, lectureImage, lectureMethod } = lecture;
  const [isCancelModalOpened, setIsCancelModalOpened] = useState(false);
  const router = useRouter();
  const classDates = schedules.map((info) => formatShortDate(info));

  const handleButtonClick = () => {
    if (activeTab === '진행중/예정') {
      // 수강 취소 로직
    } else {
      // 다시 신청
      router.push(`/class/${lecture.id}`);
    }
  };

  const handleListClick = () => {
    router.push(
      `/mypage/user/myclass/apply/${lecture.id}?type=${lectureMethod.name}`,
    );
  };

  const handleCurriculumClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/class/${lecture.id}`);
  };

  const handleSubmitCancelForm = () => {};

  return (
    <>
      <li
        onClick={handleListClick}
        className="grid h-full max-h-[13.6rem] w-full cursor-pointer grid-cols-2 grid-rows-[1fr_max-content] gap-x-2.5 gap-y-3.5 rounded-md p-3.5 shadow-vertical md:gap-4"
      >
        <figure className="flex aspect-[297/188] h-full max-h-[114px] w-full md:row-span-2 md:max-h-[188px]">
          <Image
            src={lectureImage[0].imageUrl}
            alt="클래스 이미지"
            width={0}
            height={0}
            placeholder="blur"
            blurDataURL={lectureImage[0].imageUrl}
            sizes="(max-width: 720px) 60vw, (max-width: 1440px) 30vw"
            className="object-none"
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '11.75rem',
            }}
          />
        </figure>

        <div className="flex w-full flex-col text-sm font-semibold text-gray-100">
          <h2 className="mb-2.5 line-clamp-1 w-full text-base font-bold text-black">
            {title}
          </h2>

          <span>{lectureMethod.name}</span>

          <div className="grid w-full grid-cols-[3.3rem_1fr] gap-x-2.5 gap-y-2 text-sm">
            <p>수업 날짜</p>
            <div className="flex w-full flex-wrap gap-x-4 gap-y-1 font-medium">
              {classDates.map((date) => (
                <span key={date}>{date}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-2 mt-auto flex w-full items-center justify-between gap-3.5 whitespace-nowrap pr-2 text-sm md:col-span-1">
          <div className="flex flex-1 gap-2.5">
            <div className="w-[75px]">
              <UniqueButton
                size="small"
                color="secondary"
                onClick={handleButtonClick}
              >
                {activeTab === '진행중/예정' ? '수강취소' : '다시신청'}
              </UniqueButton>
            </div>

            {activeTab === '진행중/예정' ? (
              <button
                onClick={handleCurriculumClick}
                className={`h-7 w-[4.69rem] font-semibold ${ButtonStyles.default}`}
              >
                커리큘럼
              </button>
            ) : null}
          </div>

          <ProfileImage size="small" src={null} nickname="강사닉네임" />
        </div>
      </li>

      <CancelModal
        isOpened={isCancelModalOpened}
        handleClosed={() => {
          setIsCancelModalOpened(false);
        }}
        handleSubmitCancelForm={handleSubmitCancelForm}
      />
    </>
  );
};

export default ClassList;
