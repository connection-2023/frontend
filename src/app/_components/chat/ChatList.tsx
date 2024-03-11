import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getChatRoomList } from '@/lib/apis/chatApi';
import { reloadToast } from '@/utils/reloadMessage';

interface ChatLsitProps {
  id: string;
  chatSelectHandler: (id: number) => void;
}

const ChatList = ({ id, chatSelectHandler }: ChatLsitProps) => {
  const router = useRouter();

  const {
    data: chatRoomList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['chat', id],
    queryFn: () => getChatRoomList('user', id),
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
    <section className="flex h-full flex-col overflow-y-scroll px-4 sm:w-[19rem] sm:pl-5 sm:pr-0">
      {chatRoomList.map(({ id }) => (
        <button
          key={id}
          onClick={() => chatSelectHandler(id)}
          className="h-52 flex-shrink-0 bg-slate-400"
        >
          id
        </button>
      ))}
    </section>
  );
};

export default ChatList;
