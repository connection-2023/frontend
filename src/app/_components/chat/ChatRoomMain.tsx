import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { UploadImageSVG } from '@/icons/svg';
import { sendChat } from '@/lib/apis/chatApi';
import { useChatStore } from '@/store';
import Chat from './Chat';
import ApplyButton from '@/components/Button/ApplyButton';
import Spinner from '@/components/Spinner/Spinner';
import { userType } from '@/types/auth';
import { ChatRoomList } from '@/types/chat';

interface ChatRoomMainProps {
  selectChatRoom: ChatRoomList;
  userType: userType;
}

const ChatRoomMain = ({ selectChatRoom, userType }: ChatRoomMainProps) => {
  const chatArea = useRef<HTMLDivElement>(null);
  const messageArea = useRef<HTMLTextAreaElement>(null);

  const { setNewChatsList } = useChatStore((state) => ({
    setNewChatsList: state.setNewChatsList,
  }));

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
    onSuccess: (data) => setNewChatsList(data),
  });

  const sendMessage = () => {
    const message = messageArea.current?.value;
    if (message) {
      sendChatContent(message);
    }
  };

  return (
    <div className="flex flex-col">
      <Chat selectChatRoom={selectChatRoom} />
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
        />

        <ApplyButton
          label={isPending ? <Spinner color="main-color" /> : '전송'}
          onClick={sendMessage}
          disabled={isPending}
        />
      </div>
    </div>
  );
};

export default ChatRoomMain;
