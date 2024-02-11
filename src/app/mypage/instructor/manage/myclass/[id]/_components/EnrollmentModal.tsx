import { useQuery } from '@tanstack/react-query';
import subHours from 'date-fns/subHours';
import Link from 'next/link';
import { useState } from 'react';
import Spinner from '@/components/Loading/Spinner';
import Modal from '@/components/Modal/Modal';
import UserProfileMenu from '@/components/Profile/UserProfileMenu';
import { IProcessedSchedules, IScheduleLearnerList } from '@/types/class';
import { ChatSVG } from '@/icons/svg';
import { getScheduleRegisterLists } from '@/lib/apis/classApis';
import { formatDateTimeNoSec } from '@/utils/dateTimeUtils';

interface EnrollmentModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedClass: IProcessedSchedules;
  maxCapacity: number;
  reservationDeadline: number;
}

const EnrollmentModal = ({
  isOpen,
  closeModal,
  selectedClass,
  maxCapacity,
  reservationDeadline,
}: EnrollmentModalProps) => {
  const { id, index, numberOfParticipants, date, startDateTime } =
    selectedClass;
  const {
    data: ScheduleEnrollment,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['instructor', 'schedule', id, 'modal'],
    queryFn: () => getScheduleRegisterLists(id),
    refetchOnWindowFocus: 'always',
  });

  const deadlineTime = formatDateTimeNoSec(
    subHours(new Date(startDateTime), reservationDeadline),
  );

  return (
    <Modal isOpened={isOpen} handleClosed={closeModal}>
      <section className="flex w-[40rem] flex-col py-4">
        <div className="w-full border-b border-solid border-gray-700 px-5">
          <p className="mb-3.5 text-base">
            <span className="mr-3.5 text-lg font-bold">{index}회차</span>
            {numberOfParticipants}/{maxCapacity}명
          </p>
          <ul className="mb-4 flex w-11/12 justify-between text-base font-semibold text-gray-100">
            <li>
              수업일자
              <span className="ml-4 font-normal">
                {formatDateTimeNoSec(date)}
              </span>
            </li>
            <li>
              신청마감일<span className="ml-4 font-normal">{deadlineTime}</span>
            </li>
          </ul>
        </div>

        {isLoading ? (
          <div className="mb-auto mt-5 flex h-fit items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <ul className="flex h-[20rem] flex-col gap-4 overflow-y-auto px-5 py-4">
            {ScheduleEnrollment?.map((item) => (
              <ScheduleLearnerList key={item.userId} {...item} />
            ))}
          </ul>
        )}
      </section>
    </Modal>
  );
};

export default EnrollmentModal;

const getButtonClass = (request: string, isClicked: boolean) => {
  if (request.trim() === '') {
    return 'cursor-default text-gray-500';
  }

  return isClicked
    ? 'cursor-pointer text-sub-color1'
    : 'cursor-pointer text-black';
};

const ScheduleLearnerList = (props: IScheduleLearnerList) => {
  const { userId, nickname, phoneNumber, userProfileImage, requests, memo } =
    props;
  const [isRequestOpened, setIsRequestOpened] = useState(false);
  const [classStudentMemo, setClassStudentMemo] = useState(memo || '');

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setClassStudentMemo(event.target.value);
    // == 메모 업데이트 API 연결 필요 ==
  };

  const handleRequestClick = () => {
    setIsRequestOpened((prev) => !prev);
  };

  return (
    <li className="flex flex-col">
      <div className="flex w-full items-center justify-between whitespace-nowrap text-sm font-medium">
        <div className="flex cursor-pointer items-center">
          <UserProfileMenu
            contact={phoneNumber}
            userId={userId}
            profileImg={userProfileImage}
            name={nickname}
            nameWidth={72}
          />
        </div>
        <textarea
          value={classStudentMemo}
          onChange={handleTextareaChange}
          placeholder={`수강생에 대한 메모를 자유롭게 입력해주세요.\n이 메모는 수강생에게는 보이지 않습니다.`}
          className="h-10 w-full max-w-[18rem] resize-none whitespace-pre-wrap break-keep rounded-[0.06rem] border border-solid border-gray-700 px-[0.44rem] py-[0.19rem] text-xs focus:outline-sub-color1"
        />
        <div onClick={handleRequestClick} className="relative flex flex-col">
          <button
            aria-label="요청사항 자세히보기"
            className={getButtonClass(requests, isRequestOpened)}
          >
            요청사항
          </button>
        </div>

        <Link
          href={`/report?targetUserId=${userId}`}
          className="cursor-pointer text-gray-500 hover:text-black"
          prefetch={false}
        >
          신고
        </Link>

        <Link
          href={`/chat/${userId}`}
          aria-label="유저와 채팅"
          className="cursor-pointer"
          prefetch={false}
        >
          <ChatSVG fill="black" width="29" height="30" />
        </Link>
      </div>

      <div className="flex w-full items-center justify-end">
        {requests && isRequestOpened && (
          <div className="speech-bubble whitespace-pre-line break-keep">
            {requests}
          </div>
        )}
      </div>
    </li>
  );
};
