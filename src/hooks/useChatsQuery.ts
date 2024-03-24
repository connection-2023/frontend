import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { CHATS_TAKE } from '@/constants/constants';
import { Chat } from '@/types/chat';

interface useChatsQueryProps {
  chatRoomId: string;
  queryFn: ({
    pageParam,
  }: {
    pageParam: string;
  }) => Promise<{ chats: Chat[]; totalItemCount: number }>;
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
    getNextPageParam: (lastPage, allpages) => {
      const currentCount = allpages.length * CHATS_TAKE;

      return lastPage.totalItemCount > currentCount
        ? lastPage.chats?.at(-1)?.id
        : undefined;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: 'always',
  });

  const chats = useMemo(() => {
    const chatList = data?.pages.flatMap(({ chats }) => chats).reverse() ?? [];
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
