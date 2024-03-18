import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import { ButtonStyles } from '@/constants/constants';
import { formatShortDate } from '@/utils/dateTimeUtils';
import { UniqueButton } from '@/components/Button';
import ProfileImage from '@/components/Profile/ProfileImage';
import { IUserApplyClass } from '@/types/class';

interface IClassList extends IUserApplyClass {
  activeTab: '진행중/예정' | '수강 완료';
}

const ClassList = (props: IClassList) => {
  const {
    activeTab,
    lectureSchedule,
    regularLectureSchedule,
    lecturer,
    lecture,
  } = props;
  const { title, lectureImage, lectureMethod } = lecture;
  const { id, nickname, profileCardImageUrl } = lecturer;
  const router = useRouter();
  const classDates = (() => {
    if (lectureSchedule) {
      return [formatShortDate(lectureSchedule.startDateTime)];
    }
    if (regularLectureSchedule) {
      return regularLectureSchedule.map((schedule) =>
        formatShortDate(schedule.startDateTime),
      );
    }
    return [];
  })();

  const handleListClick = () => {
    const scheduleId = (() => {
      if (lectureSchedule) return lectureSchedule.id;

      if (regularLectureSchedule) return regularLectureSchedule[0].id;

      return null;
    })();

    if (scheduleId) {
      router.push(
        `/mypage/user/myclass/apply/${scheduleId}?type=${lectureMethod.name}`,
      );
    }
  };

  const handleReApplyButton = (e: MouseEvent) => {
    e.stopPropagation();
    router.push(`/class/${lecture.id}`);
  };

  const handleCurriculumClick = (e: MouseEvent) => {
    e.stopPropagation();
    router.push(`/class/${lecture.id}`);
  };

  const handleLecturerClick = (e: MouseEvent) => {
    e.stopPropagation();
    router.push(`/instructor/${id}`);
  };

  return (
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
          className="object-cover"
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

        <span>{lectureMethod.name} 클래스</span>

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
        {activeTab === '진행중/예정' ? (
          <div className="w-[4.69rem]">
            <button
              onClick={handleCurriculumClick}
              className={`h-7 font-semibold ${ButtonStyles.default}`}
            >
              커리큘럼
            </button>
          </div>
        ) : (
          <div className="w-[75px]" onClick={handleReApplyButton}>
            <UniqueButton size="small" color="secondary">
              다시신청
            </UniqueButton>
          </div>
        )}

        <div onClick={handleLecturerClick}>
          <ProfileImage
            size="small"
            src={profileCardImageUrl}
            nickname={nickname}
          />
        </div>
      </div>
    </li>
  );
};

export default ClassList;
