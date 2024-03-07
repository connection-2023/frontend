interface ChatLsitProps {
  chatSelectHandler: (id: number) => void;
}

const ChatList = ({ chatSelectHandler }: ChatLsitProps) => {
  return (
    <section className="flex h-full flex-col overflow-y-scroll pl-5 sm:w-[19rem]">
      <button
        onClick={() => chatSelectHandler(12)}
        className="h-52 flex-shrink-0 "
      >
        채팅방 목록
      </button>
      <button className="h-52 flex-shrink-0 ">채팅방 목록</button>
      <button className="h-52 flex-shrink-0 ">채팅방 목록</button>
      <button className="h-52 flex-shrink-0 ">채팅방 목록</button>
      <button className="h-52 flex-shrink-0 ">채팅방 목록</button>
      <button className="h-52 flex-shrink-0 ">채팅방 목록</button>
      <button className="h-52 flex-shrink-0 ">채팅방 목록</button>
      <button className="h-52 flex-shrink-0 ">채팅방 목록</button>
      <button className="h-52 flex-shrink-0 ">채팅방 목록</button>
      <button className="h-52 flex-shrink-0 ">채팅방 목록</button>
      <button className="h-52 flex-shrink-0 ">채팅방 목록</button>
      <button className="h-52 flex-shrink-0 ">채팅방 목록</button>
      <button className="h-52 flex-shrink-0 ">채팅방 목록</button>
    </section>
  );
};

export default ChatList;
