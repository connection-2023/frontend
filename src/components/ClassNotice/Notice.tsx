import { useState } from 'react';
import { NoticeSVG } from '@/icons/svg';
import UniqueButton from '../Button/UniqueButton';

interface INoticeProps {
  content: string;
  updateDate: string;
  isEditMode?: boolean;
  submitNoticeUpdate?: (text: string) => void;
}

const Notice = ({
  content,
  updateDate,
  isEditMode = false,
  submitNoticeUpdate,
}: INoticeProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const [text, setText] = useState(content);
  const [updatedDate, setUpdatedDate] = useState<string | Date>(updateDate);

  const handleEditButtonClick = () => {
    setIsEditable(!isEditable);
    setText(content);
  };

  const handleNoticeUpdate = () => {
    if (submitNoticeUpdate && text !== content) {
      submitNoticeUpdate(text);
      setIsEditable(false);
      setUpdatedDate(new Date());
    }
  };

  return (
    <div className="w-full rounded-lg border border-solid border-sub-color1 p-[0.96rem] text-sm md:whitespace-nowrap">
      <div className="mb-2 flex items-center whitespace-nowrap font-bold text-sub-color1">
        <NoticeSVG
          width="20"
          height="15"
          className="mr-[0.38rem] shrink-0 fill-sub-color1 stroke-sub-color1"
        />
        <h2>공지사항</h2>
        {isEditMode && isEditable ? (
          <div className="flex">
            <div className="ml-2 w-10 text-sm font-medium">
              <UniqueButton
                size="xsmall"
                color="secondary"
                onClick={handleNoticeUpdate}
              >
                저장
              </UniqueButton>
            </div>
            <div className="ml-2 w-10 text-sm font-medium">
              <UniqueButton
                size="xsmall"
                color="secondary"
                onClick={handleEditButtonClick}
              >
                취소
              </UniqueButton>
            </div>
          </div>
        ) : isEditMode && !isEditable ? (
          <div>
            <div className="ml-2 w-10 text-sm font-medium">
              <UniqueButton
                size="xsmall"
                color="secondary"
                onClick={handleEditButtonClick}
              >
                수정
              </UniqueButton>
            </div>
          </div>
        ) : null}
        <span className="flex w-full justify-end text-sm font-medium">
          최근 업데이트 {new Date(updatedDate).toLocaleDateString('ko-KR')}
        </span>
      </div>
      {isEditable ? (
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="h-full w-full resize-none whitespace-pre-wrap break-keep rounded-md p-2 focus:outline-sub-color1"
        />
      ) : (
        <div>{text}</div>
      )}
    </div>
  );
};

export default Notice;
