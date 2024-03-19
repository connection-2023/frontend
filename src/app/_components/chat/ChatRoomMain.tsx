import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { UploadImageSVG } from '@/icons/svg';
import { sendChat } from '@/lib/apis/chatApi';
import Chat from './Chat';
import ApplyButton from '@/components/Button/ApplyButton';
import Spinner from '@/components/Spinner/Spinner';
import { userType } from '@/types/auth';
import { ChatRoom } from '@/types/chat';

interface ChatRoomMainProps {
  selectChatRoom: ChatRoom;
  userType: userType;
}

const ChatRoomMain = ({ selectChatRoom, userType }: ChatRoomMainProps) => {
  const chatArea = useRef<HTMLDivElement>(null);
  const messageArea = useRef<HTMLTextAreaElement>(null);
  const [sendChatPreview, setSendChatPreview] = useState<{
    message: string;
    error: boolean;
  } | null>(null);

  const opponentType = userType === 'user' ? 'lecturerId' : 'userId';

  const handleResizeHeight = () => {
    if (
      chatArea.current &&
      messageArea.current &&
      chatArea.current.parentElement
    ) {
      const maxHeightStr = getComputedStyle(chatArea.current).maxHeight;
      const parentHeight = chatArea.current.parentElement.clientHeight;
      const maxHeight = (parentHeight * parseFloat(maxHeightStr)) / 100;

      messageArea.current.style.height = 'auto';
      const scrollHeight = messageArea.current.scrollHeight;

      if (scrollHeight <= maxHeight) {
        messageArea.current.style.height = `${scrollHeight}px`;
      } else {
        messageArea.current.style.height = `${maxHeight - 24}px`;
      }
    }
  };

  useEffect(() => {
    handleResizeHeight();
  }, [
    chatArea.current?.parentElement?.clientHeight,
    chatArea.current?.parentElement?.clientWidth,
  ]);

  const { mutate: sendChatContent, isPending } = useMutation({
    mutationFn: async (content: string) => {
      const data = {
        chatRoomId: selectChatRoom.id,
        receiverId: selectChatRoom[opponentType],
        content,
      };
      const newChat = await sendChat(data, userType);
      return { ...newChat, createdAt: new Date() };
    },
    onSuccess: () => setSendChatPreview(null),
    onError: () =>
      setSendChatPreview((prev) => ({
        message: prev?.message || '',
        error: true,
      })),
    onMutate: (message) => setSendChatPreview({ error: false, message }),
  });

  const sendMessage = () => {
    const message = messageArea.current?.value;
    if (message) {
      sendChatContent(message);
      messageArea.current.value = '';
    }
  };

  const resendMessage = () => {
    if (sendChatPreview) {
      sendChatContent(sendChatPreview.message);
      setSendChatPreview(null);
    }
  };

  const cancelMessage = () => {
    setSendChatPreview(null);
  };

  return (
    <div className="flex flex-col">
      <Chat
        selectChatRoom={selectChatRoom}
        sendChatPreview={sendChatPreview}
        opponentType={opponentType}
        resendMessage={resendMessage}
        cancelMessage={cancelMessage}
      />
      <div
        ref={chatArea}
        className="grid h-fit max-h-[35%] w-full grid-cols-[2rem_auto_3rem] gap-x-2 overflow-hidden px-2 py-3 sm:grid-cols-[2rem_auto_5rem] [&>*:nth-child(3)]:h-7 sm:[&>*:nth-child(3)]:h-9 "
      >
        <button className="h-9 w-8 border-r border-gray-500">
          <UploadImageSVG className="size-6 fill-gray-300" />
        </button>

        <textarea
          ref={messageArea}
          rows={1}
          onInput={handleResizeHeight}
          placeholder="메세지를 입력하세요."
          className="resize-none overflow-auto outline-none"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !isPending) {
              event.preventDefault();
              sendMessage();
            }
          }}
        />

        <ApplyButton
          label={isPending ? <Spinner color="white" size={5} /> : '전송'}
          onClick={sendMessage}
          disabled={isPending}
        />
      </div>
    </div>
  );
};

export default ChatRoomMain;
