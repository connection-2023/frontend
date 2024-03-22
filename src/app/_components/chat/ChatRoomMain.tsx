import {
  UseQueryResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { CHAT_INTERSECT_REF_OPTIONS } from '@/constants/constants';
import useIntersect from '@/hooks/useIntersect';
import { UploadImageSVG } from '@/icons/svg';
import { createNewChatRoom, readChat, sendChat } from '@/lib/apis/chatApi';
import { useChatStore } from '@/store';
import Chat from './Chat';
import ApplyButton from '@/components/Button/ApplyButton';
import ProfileImg from '@/components/Profile/ProfileImage';
import Spinner from '@/components/Spinner/Spinner';
import { userType } from '@/types/auth';
import { ChatRoom, OpponentInfo, Chat as NewChat } from '@/types/chat';

interface ChatRoomMainProps {
  selectChatRoom: ChatRoom;
  userType: userType;
  opponentProfile: UseQueryResult<OpponentInfo, Error>;
}

const ChatRoomMain = ({
  selectChatRoom,
  userType,
  opponentProfile,
}: ChatRoomMainProps) => {
  const chatArea = useRef<HTMLDivElement>(null);
  const messageArea = useRef<HTMLTextAreaElement>(null);

  const [sendChatPreview, setSendChatPreview] = useState<{
    message: string;
    error: boolean;
  } | null>(null);
  const [isReceived, setIsReceived] = useState(false);

  const { newchat } = useChatStore((state) => ({ newchat: state.newChat }));

  const queryClient = useQueryClient();

  const opponentType = userType === 'user' ? 'lecturerId' : 'userId';
  const userId = userType === 'user' ? 'userId' : 'lecturerId';

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

  const readNewChat = () => {
    setIsReceived(false);
  };

  useEffect(() => {
    handleResizeHeight();
  }, [
    chatArea.current?.parentElement?.clientHeight,
    chatArea.current?.parentElement?.clientWidth,
  ]);

  const { ref: newChatRef } = useIntersect(
    isReceived ? readNewChat : () => {},
    CHAT_INTERSECT_REF_OPTIONS,
  );

  const chatScrollToBottom = () => {
    if (newChatRef.current) {
      newChatRef.current.scrollIntoView({ behavior: 'instant', block: 'end' });
    }
  };

  const { mutate: readChatFn } = useMutation({
    mutationFn: (chatRoomId: string) => readChat(chatRoomId),
    onSuccess: (chatRoomId) =>
      queryClient.setQueryData<ChatRoom[]>(
        ['chatRoomList', selectChatRoom[userId]],
        (oldData) => {
          if (!oldData) return oldData;

          const targetChatRoomIndex = oldData.findIndex(
            (chatRoom) => chatRoom.id === chatRoomId,
          );

          const targetChatRoom = oldData[targetChatRoomIndex];
          const updatedChatRoom = {
            ...targetChatRoom,
            unreadCount: undefined,
          };

          const updatedData = [...oldData];
          updatedData.splice(targetChatRoomIndex, 1);
          updatedData.unshift(updatedChatRoom);

          return updatedData;
        },
      ),
  });

  useEffect(() => {
    if (newchat && newchat?.chatRoomId === selectChatRoom.id) {
      readChatFn(selectChatRoom.id);
      if (newchat.sender[opponentType]) {
        setIsReceived(true);
      }
    }
  }, [newchat]);

  useEffect(() => {
    // chatScrollToBottom();
    if (
      selectChatRoom.id &&
      selectChatRoom.unreadCount &&
      selectChatRoom.unreadCount > 0
    ) {
      readChatFn(selectChatRoom.id);
    }
  }, [selectChatRoom]);

  const { mutate: sendChatContent, isPending } = useMutation({
    mutationFn: async (content: string) => {
      let newChatRoom: ChatRoom | null = null;
      if (!selectChatRoom.id) {
        newChatRoom = await createNewChatRoom(
          selectChatRoom[userId],
          selectChatRoom[opponentType],
        );
      }

      const data = {
        chatRoomId: selectChatRoom.id ?? newChatRoom?.id,
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
      handleResizeHeight();
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
        newChatRef={newChatRef}
        chatScrollToBottom={chatScrollToBottom}
      />
      <div
        ref={chatArea}
        className="relative grid h-fit max-h-[35%] w-full grid-cols-[2rem_auto_3rem] gap-x-2 px-2 py-3 sm:grid-cols-[2rem_auto_5rem] [&>*:nth-child(3)]:h-7 sm:[&>*:nth-child(3)]:h-9 "
      >
        {isReceived && newchat && (
          <NewReceiveChatAlarm
            opponentProfile={opponentProfile}
            newchat={newchat}
            chatScrollToBottom={chatScrollToBottom}
          />
        )}

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

interface NewReceiveChatAlarmProps {
  opponentProfile: UseQueryResult<OpponentInfo, Error>;
  newchat: NewChat;
  chatScrollToBottom: () => void;
}

const NewReceiveChatAlarm = ({
  opponentProfile,
  newchat,
  chatScrollToBottom,
}: NewReceiveChatAlarmProps) => {
  const {
    data: profileDate,
    isLoading: profileIsLoading,
    error: profileError,
  } = opponentProfile;

  return (
    <button
      onClick={chatScrollToBottom}
      className="absolute -top-11 left-1/2 mx-auto flex h-8 w-10/12 -translate-x-1/2 items-center gap-1 rounded-full border border-main-color bg-white px-2"
    >
      {profileIsLoading || profileError ? (
        <div className="mr-3 size-[22px] flex-shrink-0 animate-pulse rounded-full bg-gray-700" />
      ) : (
        <ProfileImg src={profileDate?.profilImg} size="xsmall" marginLeft={0} />
      )}
      <div className="flex-grow truncate">{newchat.content}</div>
    </button>
  );
};
