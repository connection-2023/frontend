'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, MouseEvent, useEffect } from 'react';
import { HeartSVG } from '@/../public/icons/svg';
import { postClassLikes, deleteClassLikes } from '@/lib/apis/classApis';
import {
  instructorsLikeCancel,
  instructorsLikes,
} from '@/lib/apis/instructorLikesBlockApis';
import LikeLoading from './LikeLoading';
import Spinner from '../Loading/Spinner';

interface LikeProps {
  id: string | number;
  type: 'class' | 'instructor';
  isLiked?: boolean;
  likeEvent?: (id: string | number) => void;
}

const Like = ({ id, type, isLiked, likeEvent }: LikeProps) => {
  const queryClient = useQueryClient();
  const likeList = queryClient.getQueryData(['like', type, 'user']);

  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(Array.isArray(likeList) && likeList.includes(Number(id)));
  }, [id, likeList]);

  const style = liked
    ? 'fill-main-color stroke-main-color'
    : 'hover:fill-main-color hover:stroke-main-color stroke-gray-500 stroke-2';

  const { mutate: deleteLike, isPending: deleteLoading } = useMutation({
    mutationFn: () => {
      return type === 'class'
        ? deleteClassLikes(String(id))
        : instructorsLikeCancel(id);
    },
    onSuccess: () => {
      if (likeEvent) likeEvent(id);
      if (likeList && Array.isArray(likeList)) {
        queryClient.setQueryData(
          ['like', type, 'user'],
          likeList.filter((likeId: number) => Number(id) !== likeId),
        );
      }
      setLiked(false);
    },
  });

  const { mutate: postLike, isPending: postLikeLoading } = useMutation({
    mutationFn: () => {
      return type === 'class'
        ? postClassLikes(String(id))
        : instructorsLikes(id);
    },
    onSuccess: () => {
      queryClient.setQueryData(
        ['like', type, 'user'],
        likeList && Array.isArray(likeList)
          ? [...likeList, Number(id)]
          : [Number(id)],
      );
      setLiked(true);
    },
  });

  const likeHandler = (e: MouseEvent) => {
    e.stopPropagation();
    liked ? deleteLike() : postLike();
  };

  const isLoading = deleteLoading || postLikeLoading;

  return isLoading ? (
    <LikeLoading liked={!!liked} />
  ) : (
    <button onClick={likeHandler} aria-label="관심 표시">
      <HeartSVG width="29" height="30" className={style} />
    </button>
  );
};

export default Like;
