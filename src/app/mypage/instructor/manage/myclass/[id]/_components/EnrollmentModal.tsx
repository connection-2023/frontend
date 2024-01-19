import { format, subHours } from 'date-fns';
import { useState } from 'react';
import { dummyEnrollmentPerson } from '@/constants/dummy';
import { ChatSVG } from '@/icons/svg';
import Modal from '@/components/Modal/Modal';
import ProfileImage from '@/components/ProfileImage/ProfileImage';
import { IProcessedSchedules } from '@/types/class';

interface EnrollmentModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedClass: IProcessedSchedules | null;
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
  if (!selectedClass) return null;

  const { id, index, numberOfParticipants, date, startDateTime } =
    selectedClass;

  const deadlineTime = format(
    subHours(new Date(startDateTime), reservationDeadline),
    'yyyy.MM.dd HH:mm',
  );

  return (
    <Modal isOpened={isOpen} handleClosed={closeModal}>
      <section className="flex w-[40rem] flex-col py-4">
        <div className="w-full border-b border-solid border-gray-700 px-5">
          <p className="mb-[0.81rem] text-base">
            <span className="mr-[0.81rem] text-lg font-bold">{index}회차</span>
            {numberOfParticipants}/{maxCapacity}명
          </p>
          <ul className="mb-4 flex w-11/12 justify-between text-base font-semibold text-gray-100">
            <li>
              수업일자
              <span className="ml-4 font-normal">
                {format(date, 'yyyy.MM.dd HH:mm')}
              </span>
            </li>
            <li>
              신청마감일<span className="ml-4 font-normal">{deadlineTime}</span>
            </li>
          </ul>
        </div>

        <ul className="flex h-[20rem] flex-col gap-4 overflow-y-auto px-5 py-4">
          {dummyEnrollmentPerson.map((item) => (
            <Person
              key={item.userId}
              userId={item.userId}
              src={item.src}
              nickname={item.nickname}
              memo={item.memo}
              request={item.request}
            />
          ))}
        </ul>
      </section>
    </Modal>
  );
};

export default EnrollmentModal;

interface IPerson {
  userId: number;
  src: string | null;
  nickname: string;
  memo: string;
  request: string | null;
}

const getButtonClass = (request: string | null, isClicked: boolean) => {
  if (request === null) {
    return 'cursor-default text-gray-500';
  }

  return isClicked
    ? 'cursor-pointer text-sub-color1'
    : 'cursor-pointer text-black';
};
const Person = ({ userId, src, nickname, memo, request }: IPerson) => {
  const [isClicked, setIsClicked] = useState(false);
  const [classStudentMemo, setClassStudentMemo] = useState(memo);

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setClassStudentMemo(event.target.value);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <li className="flex flex-col">
      <div className="flex w-full items-center justify-between whitespace-nowrap text-sm font-medium">
        <div className="flex cursor-pointer items-center">
          <ProfileImage src={src} label={false} size="small" />
          <p className=" ml-[0.69rem] w-[4.5rem] truncate">{nickname}</p>
        </div>
        <textarea
          value={classStudentMemo}
          onChange={handleTextareaChange}
          placeholder={`수강생에 대한 메모를 자유롭게 입력해주세요.\n이 메모는 수강생에게는 보이지 않습니다.`}
          className="h-10 w-full max-w-[18rem] resize-none whitespace-pre-wrap break-keep rounded-[0.06rem] border border-solid border-gray-700 px-[0.44rem] py-[0.19rem] text-xs"
        />
        <div onClick={handleClick} className="relative flex flex-col">
          <button
            aria-label="요청사항 자세히보기"
            className={getButtonClass(request, isClicked)}
          >
            요청사항
          </button>
        </div>
        <p className="cursor-pointer text-gray-500">
          {/* 누르면 useId로 신고 연결 예정 */}
          신고
        </p>
        <button aria-label="유저와 채팅" className="cursor-pointer">
          {/* 누르면 useId로 채팅 연결 예정 */}
          <ChatSVG fill="black" width="29" height="30" />
        </button>
      </div>
      <div className="flex w-full items-center justify-end ">
        {request && isClicked && (
          <div className="speech-bubble  whitespace-pre-line break-keep">
            {request}
          </div>
        )}
      </div>
    </li>
  );
};
