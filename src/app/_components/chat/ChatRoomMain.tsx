import { useEffect, useRef } from 'react';
import { UploadImageSVG } from '@/icons/svg';
import ApplyButton from '@/components/Button/ApplyButton';

const ChatRoomMain = () => {
  const chatArea = useRef<HTMLDivElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = () => {
    if (
      chatArea.current &&
      textarea.current &&
      chatArea.current.parentElement
    ) {
      const maxHeightStr = getComputedStyle(chatArea.current).maxHeight;
      const parentHeight = chatArea.current.parentElement.clientHeight;
      const maxHeight = (parentHeight * parseFloat(maxHeightStr)) / 100;

      textarea.current.style.height = 'auto';
      const scrollHeight = textarea.current.scrollHeight;

      if (scrollHeight <= maxHeight) {
        textarea.current.style.height = `${scrollHeight}px`;
      } else {
        textarea.current.style.height = `${maxHeight - 24}px`;
      }
    }
  };

  useEffect(() => {
    handleResizeHeight();
  }, [chatArea.current?.parentElement?.clientHeight]);

  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-grow flex-col bg-gray-900" />
      <div
        ref={chatArea}
        className="grid h-fit max-h-[35%] w-full grid-cols-[2rem_auto_3rem] gap-x-2 overflow-hidden px-2 py-3 sm:grid-cols-[2rem_auto_5rem] [&>*:nth-child(3)]:h-7 sm:[&>*:nth-child(3)]:h-9 "
      >
        <button className="h-9 w-8 border-r border-gray-500">
          <UploadImageSVG className="size-6 fill-gray-300" />
        </button>

        <textarea
          ref={textarea}
          rows={1}
          onInput={handleResizeHeight}
          className="resize-none overflow-auto"
        />

        <ApplyButton label="전송" onClick={() => console.log('전송')} />
      </div>
    </div>
  );
};

export default ChatRoomMain;
