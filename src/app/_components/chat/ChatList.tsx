import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getChatRoomList } from '@/lib/apis/chatApi';
import { userType } from '@/types/auth';
import { ChatRoomList } from '@/types/chat';

interface ChatLsitProps {
  id: string;
  chatSelectHandler: (chatRoom: ChatRoomList | null) => void;
  userType: userType;
}

const ChatList = ({ id, chatSelectHandler, userType }: ChatLsitProps) => {
  const router = useRouter();

  const {
    data: chatRoomList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['chat', id],
    queryFn: () => getChatRoomList(userType, id),
    refetchOnWindowFocus: 'always',
  });

  if (isLoading) {
    return '로딩';
  }

  if (!chatRoomList || chatRoomList instanceof Error || error) {
    toast.error('다시 시도 해 주세요.');
    router.refresh();
    return;
  }

  return (
    <section className="flex h-full flex-col overflow-y-scroll px-4 sm:w-72 sm:px-0 sm:pr-0">
      {chatRoomList.map((chatRoom) => (
        <button
          key={id}
          onClick={() => chatSelectHandler(chatRoom)}
          className="h-52 flex-shrink-0 bg-slate-400"
        >
          {chatRoom.roomId}
        </button>
      ))}
    </section>
  );
};

export default ChatList;
