import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ButtonStyles } from '@/constants/constants';
import { formatShortDate } from '@/utils/dateTimeUtils';
import CancelModal from './CancelModal';
import DeclineModal from './DeclineModal';
import UniqueButton from '@/components/Button/UniqueButton';
import ProfileImage from '@/components/ProfileImage/ProfileImage';
import { IUserClassResponse } from '@/types/class';

interface IClassList extends IUserClassResponse {
  activeTab: string;
}

const ClassList = ({ activeTab, reservation, lecturer }: IClassList) => {
  const [isDeclineModalOpened, setIsDeclineModalOpened] = useState(false);
  const [isCancelModalOpened, setIsCancelModalOpened] = useState(false);
  const router = useRouter();
  const classDates = reservation.map((info) =>
    formatShortDate(info.lectureSchedule.startDateTime),
  );

  const uniqueClassDates = new Set(classDates);

  const buttonText = () => {
    switch (activeTab) {
      case '진행중':
      case '대기':
        return '수강취소';
      case '수강완료':
        return '다시 신청';
      default:
        return '취소사유';
    }
  };

  const handleClassStatusChange = () => {
    switch (activeTab) {
      case '진행중':
      case '대기':
        setIsCancelModalOpened(true);
        break;

      case '수강완료':
        break;

      case '취소/거절':
        setIsDeclineModalOpened(true);
        break;

      default:
        break;
    }
  };

  const handleListClick = () => {
    router.push(`/my/class/${reservation[0].lectureSchedule.lecture.id}`);
  };

  const handleCurriculumClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/class/${reservation[0].lectureSchedule.lecture.id}`);
  };

  const handleSubmitCancelForm = () => {};

  return (
    <>
      <li
        onClick={handleListClick}
        className="grid h-full max-h-[13.6rem] w-full cursor-pointer auto-rows-max grid-cols-2 gap-x-2.5 gap-y-3.5 rounded-md p-3.5 shadow-vertical md:gap-4"
      >
        <figure className="flex aspect-[297/188] h-full max-h-[188px] w-full md:row-span-2">
          <Image
            src={
              reservation[0].lectureSchedule.lecture.lectureImage[0].imageUrl
            }
            alt="클래스 이미지"
            width={0}
            height={0}
            placeholder="blur"
            blurDataURL={
              reservation[0].lectureSchedule.lecture.lectureImage[0].imageUrl
            }
            sizes="(max-width: 720px) 60vw, (max-width: 1440px) 30vw"
            className="object-none"
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '11.75rem',
            }}
          />
        </figure>

        <div className="flex w-full flex-col items-center">
          <h2 className="mb-2.5 line-clamp-1 w-full text-base font-bold text-black">
            {reservation[0].lectureSchedule.lecture.title}
          </h2>

          <div className="grid w-full grid-cols-[3.3rem_1fr] gap-x-[0.69rem] gap-y-[0.44rem] text-sm">
            <p>신청 횟수</p> <span>{reservation.length}회</span>
            <p>수업 날짜</p>
            <div className="flex w-full flex-wrap gap-x-4 gap-y-1">
              {[...uniqueClassDates].map((date) => (
                <span key={date}>{date}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-2 mt-auto flex w-full items-center justify-between gap-3.5 whitespace-nowrap pr-2 text-sm md:col-span-1">
          <div className="flex flex-1 gap-2.5">
            <div className="w-full">
              <UniqueButton
                size="small"
                color="secondary"
                onClick={handleClassStatusChange}
              >
                {buttonText()}
              </UniqueButton>
            </div>

            {activeTab === '진행중' && (
              <button
                onClick={handleCurriculumClick}
                className={`h-7 w-[4.69rem] font-semibold ${ButtonStyles.default}`}
              >
                커리큘럼
              </button>
            )}
          </div>

          <ProfileImage
            size="small"
            src={lecturer.profileCardImageUrl}
            nickname={lecturer.nickname}
          />
        </div>
      </li>

      <CancelModal
        isOpened={isCancelModalOpened}
        handleClosed={() => {
          setIsCancelModalOpened(false);
        }}
        handleSubmitCancelForm={handleSubmitCancelForm}
      />

      <DeclineModal
        isDeclineModalOpened={isDeclineModalOpened}
        handleClosed={() => {
          setIsDeclineModalOpened(false);
        }}
      />
    </>
  );
};

export default ClassList;
