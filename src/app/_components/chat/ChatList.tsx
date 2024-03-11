import { ChatRoomList } from '@/types/chat';

interface ChatLsitProps {
  id: string;
  chatSelectHandler: (chatRoom: ChatRoomList | null) => void;
  chatRoomList: ChatRoomList[];
}

const ChatList = ({ id, chatSelectHandler, chatRoomList }: ChatLsitProps) => {
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
