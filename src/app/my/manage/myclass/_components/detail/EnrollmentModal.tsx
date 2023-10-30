import { useState } from 'react';
import Modal from 'react-modal';
import { dummyEnrollmentPerson } from '@/constants/dummy';
import { CloseSVG, CommentSVG } from '@/icons/svg';
import ProfileImage from '@/components/ProfileImage/ProfileImage';

// 회차정보, 정원, 수업일자, 마감일을 서버에서 요청할지 table에서 가져올지 고민...
interface IEnrollmentModal {
  isOpen: boolean;
  closeModal: () => void;
}

const EnrollmentModal = ({ isOpen, closeModal }: IEnrollmentModal) => {
  return (
    <Modal
      onRequestClose={closeModal}
      isOpen={isOpen}
      style={customModalStyles}
      ariaHideApp={false}
    >
      <div className="relative w-full border-b border-solid border-sub-color4 px-5">
        <p className="mb-[0.81rem] text-base">
          <span className="mr-[0.81rem] text-lg font-bold">1회차</span> 5/6명
        </p>
        <button aria-label="모달 닫기" className="absolute right-5 top-0">
          <CloseSVG
            width={24}
            height={24}
            onClick={closeModal}
            className="stroke-sub-color2 stroke-2"
          />
        </button>
        <ul className="mb-4 flex w-11/12 justify-between text-base font-semibold text-sub-color3">
          <li>
            수업일자
            <span className="ml-4 font-normal">23.09.15 13:00-15:00</span>
          </li>
          <li>
            신청마감일<span className="ml-4 font-normal">23.09.10 14:00</span>
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
    </Modal>
  );
};

export default EnrollmentModal;

const customModalStyles: ReactModal.Styles = {
  content: {
    width: '80%',
    height: '27.5rem',
    maxWidth: '40.0625rem',
    padding: '1.2rem 0',
    zIndex: '10',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 1px 4px 0px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
};

interface IPerson {
  userId: number;
  src: string | null;
  nickname: string;
  memo: string;
  request: string | null;
}

const getButtonClass = (request: string | null, isClicked: boolean) => {
  if (request === null) {
    return 'cursor-default text-sub-color2';
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
          className="h-10 w-full max-w-[18rem] resize-none whitespace-pre-wrap break-keep rounded-[0.06rem] border border-solid border-sub-color4 px-[0.44rem] py-[0.19rem] text-xs"
        />
        <div onClick={handleClick} className="relative flex flex-col">
          <button
            aria-label="요청사항 자세히보기"
            className={getButtonClass(request, isClicked)}
          >
            요청사항
          </button>
        </div>
        <p className="cursor-pointer text-sub-color2">
          {/* 누르면 useId로 신고 연결 예정 */}
          신고
        </p>
        <button aria-label="유저와 채팅" className="cursor-pointer">
          {/* 누르면 useId로 채팅 연결 예정 */}
          <CommentSVG fill="black" width="29" height="30" />
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
