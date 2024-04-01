import {
  UseMutateFunction,
  UseQueryResult,
  useMutation,
} from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { CHAT_INTERSECT_REF_OPTIONS } from '@/constants/constants';
import useIntersect from '@/hooks/useIntersect';
import { UploadImageSVG } from '@/icons/svg';
import { createNewChatRoom, sendChat } from '@/lib/apis/chatApi';
import { postSingleImage } from '@/lib/apis/imageApi';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { useChatStore } from '@/store';
import { reloadToast } from '@/utils/reloadMessage';
import Chat from './Chat';
import ApplyButton from '@/components/Button/ApplyButton';
import ProfileImg from '@/components/Profile/ProfileImage';
import Spinner from '@/components/Spinner/Spinner';
import { userType } from '@/types/auth';
import {
  ChatRoom,
  OpponentInfo,
  Chat as NewChat,
  SendChatPreview,
} from '@/types/chat';
import { FetchError } from '@/types/types';

interface ChatRoomMainProps {
  selectChatRoom: ChatRoom;
  userType: userType;
  opponentProfile: UseQueryResult<OpponentInfo, Error>;
  readChatFn: UseMutateFunction<ChatRoom, Error, ChatRoom, unknown>;
}

const ChatRoomMain = ({
  selectChatRoom,
  userType,
  opponentProfile,
  readChatFn,
}: ChatRoomMainProps) => {
  const chatArea = useRef<HTMLDivElement>(null);
  const messageArea = useRef<HTMLTextAreaElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const { newchat, setNewChat } = useChatStore((state) => ({
    newchat: state.newChat,
    setNewChat: state.setNewChat,
  }));

  const [sendChatPreview, setSendChatPreview] = useState<SendChatPreview>(null);
  const [isReceived, setIsReceived] = useState(false);

  const opponentType = userType === 'user' ? 'lecturer' : 'user';
  const opponentId = userType === 'user' ? 'lecturerId' : 'userId';

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
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollTop =
        endOfMessagesRef.current.scrollHeight + 1000;
    }
  };

  useEffect(() => {
    if (newchat && newchat?.chatRoomId === selectChatRoom.id) {
      if (newchat.sender[opponentId]) {
        setIsReceived(true);
        readChatFn(selectChatRoom);
        return () => setNewChat(null);
      }
    }
  }, [newchat]);

  useEffect(() => {
    setSendChatPreview(null);
    chatScrollToBottom();
  }, [selectChatRoom]);

  const { mutate: sendChatContent, isPending } = useMutation({
    mutationFn: async ({
      content,
      imageUrl,
    }:
      | { content: string; imageUrl?: string }
      | { content?: string; imageUrl: string }) => {
      let newChatRoom: ChatRoom | null = null;
      if (!selectChatRoom.id) {
        newChatRoom = await createNewChatRoom(
          selectChatRoom[userType].id,
          selectChatRoom[opponentType].id,
        );
      }

      const data = {
        chatRoomId: selectChatRoom.id ?? newChatRoom?.id,
        receiverId: selectChatRoom[opponentType].id,
        content,
        imageUrl,
      };
      const newChat = await sendChat(data, userType);

      return { ...newChat, createdAt: new Date() };
    },
    onSuccess: () => setSendChatPreview(null),
    onError: async (error, variables) => {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        switch (fetchError.status) {
          case 401:
            try {
              await accessTokenReissuance();
              sendChatContent(variables);
            } catch (error) {
              reloadToast(
                '세션이 만료되었습니다. 다시 로그인해주세요.',
                'error',
              );
            }
            break;
          default:
            setSendChatPreview({ ...variables, error: true });
            console.error(error);
            break;
        }
      }
    },

    onMutate: (message) => setSendChatPreview({ error: false, ...message }),
  });

  const { mutate: sendImage, isPending: imageUrlPending } = useMutation({
    mutationFn: (image: File) => postSingleImage(image, 'chats'),
    onSuccess: (imageUrl) => sendChatContent({ imageUrl }),
  });

  const sendMessage = () => {
    const message = messageArea.current?.value;
    if (message) {
      sendChatContent({ content: message });
      messageArea.current.value = '';
      handleResizeHeight();
    }
  };

  const resendMessage = () => {
    if (
      sendChatPreview &&
      (sendChatPreview.content || sendChatPreview.imageUrl)
    ) {
      sendChatContent({ ...sendChatPreview });
      setSendChatPreview(null);
    }
  };

  const cancelMessage = () => {
    setSendChatPreview(null);
  };

  const handleButtonClick = () => {
    if (inputFileRef.current) inputFileRef.current.click();
  };

  return (
    <div className="flex flex-col">
      <Chat
        selectChatRoom={selectChatRoom}
        sendChatPreview={sendChatPreview}
        opponentId={opponentId}
        resendMessage={resendMessage}
        cancelMessage={cancelMessage}
        newChatRef={newChatRef}
        chatScrollToBottom={chatScrollToBottom}
        endOfMessagesRef={endOfMessagesRef}
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

        <button
          onClick={handleButtonClick}
          disabled={isPending || imageUrlPending}
          className="h-9 w-8 border-r border-gray-500"
        >
          <UploadImageSVG className="size-6 fill-gray-300" />
          <input
            ref={inputFileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                sendImage(e.target.files[0]);
              }
            }}
          />
        </button>

        <textarea
          ref={messageArea}
          rows={1}
          onInput={handleResizeHeight}
          placeholder="메세지를 입력하세요."
          className="resize-none overflow-auto outline-none"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !isPending && !imageUrlPending) {
              event.preventDefault();
              sendMessage();
            }
          }}
        />

        <ApplyButton
          label={
            isPending || imageUrlPending ? (
              <Spinner color="white" size={5} />
            ) : (
              '전송'
            )
          }
          onClick={sendMessage}
          disabled={isPending || imageUrlPending}
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
        <ProfileImg
          src={profileDate?.profileImg}
          size="xsmall"
          marginLeft={0}
        />
      )}
      <div className="flex-grow truncate">{newchat.content}</div>
    </button>
  );
};
