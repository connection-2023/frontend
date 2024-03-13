import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Chat } from '@/types/chat';

interface useChatsQueryProps {
  chatRoomId: string;
  queryFn: ({ pageParam }: { pageParam: string }) => Promise<Chat[]>;
}

const useChatsQuery = ({ chatRoomId, queryFn }: useChatsQueryProps) => {
  const {
    data,
    isError,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['chats', chatRoomId],
    initialPageParam: '',
    queryFn,
    getNextPageParam: (lastPage) => lastPage?.at(-1)?.id,
  });

  const chats = useMemo(() => {
    const chatList = data?.pages.flatMap((chat) => chat) ?? [];
    return chatList;
  }, [data]);

  return {
    chats,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useChatsQuery;
