import { getRecentApply } from '@/lib/apis/serverApis/classApi';
import { formatClassTime } from '@/utils/dateTimeUtils';
import UserProfileMenu from '@/components/Profile/UserProfileMenu';

const RecentApply = async () => {
  const data = await getRecentApply();

  return data.length ? (
    <ul>
      {data.map((item) => {
        const {
          id,
          user,
          representative,
          participants,
          phoneNumber,
          lectureSchedule,
          regularLectureStatus,
          lecture,
        } = item;

        const participantInfo = lectureSchedule
          ? `(${lectureSchedule.numberOfParticipants}/${lecture.maxCapacity})`
          : regularLectureStatus
          ? `(${regularLectureStatus.numberOfParticipants}/${lecture.maxCapacity})`
          : null;

        return (
          <li
            key={id}
            className="flex flex-col justify-center px-3.5 py-4 text-sm"
          >
            <div className="mb-2 flex gap-x-2">
              <UserProfileMenu
                contact={phoneNumber}
                userId={user.id}
                profileImg={user.profileImageUrl}
                name={`${representative} (${participants}명)`}
              />
            </div>

            <h2 className="mb-1 flex font-bold">
              {lecture.title}

              <p className="ml-1 text-base text-sm font-medium text-gray-100">
                {participantInfo}
              </p>
            </h2>

            <p className="font-medium text-sub-color1">
              {/* 정기 클래스일 때 추가 예정 */}
              {lectureSchedule &&
                formatClassTime(
                  lectureSchedule.startDateTime,
                  lectureSchedule.endDateTime,
                )}
            </p>
          </li>
        );
      })}
    </ul>
  ) : (
    <p className="flex flex-1 items-center justify-center">
      최근 신청한 수강생이 없습니다.
    </p>
  );
};

export default RecentApply;
