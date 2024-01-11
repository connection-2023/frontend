'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { HeartSVG } from '@/../public/icons/svg';
import { postClassLikes, deleteClassLikes } from '@/lib/apis/classApis';
import {
  instructorsLikeCancel,
  instructorsLikes,
} from '@/lib/apis/instructorLikesBlockApis';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { FetchError } from '@/types/types';

interface LikeProps {
  id: string | number;
  type: 'class' | 'instructor';
  isLiked?: boolean;
  likeEvent?: (id: string | number) => void;
}

const Like = ({ id, type, isLiked, likeEvent }: LikeProps) => {
  const [liked, setLiked] = useState(isLiked);
  const style = liked
    ? 'fill-main-color stroke-main-color hover:fill-none hover:stroke-none'
    : 'hover:fill-main-color hover:stroke-main-color';

  const handleLike = async () => {
    let retryFunc: () => Promise<any> = async () => {};

    try {
      if (type === 'class') {
        retryFunc = liked
          ? () => deleteClassLikes(String(id))
          : () => postClassLikes(String(id));
        await retryFunc();
        setLiked(!liked);
      } else {
        retryFunc = liked
          ? async () => {
              await instructorsLikeCancel(id);
              if (likeEvent) likeEvent(id);
            }
          : () => instructorsLikes(id);
        await retryFunc();
        setLiked(!liked);
      }
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            if (retryFunc) await retryFunc();
            setLiked(!liked);
          } catch (error) {
            console.error(error);
          }
        } else {
          toast.error('잘못된 요청입니다!');
        }
      }
    }
  };

  return (
    <button onClick={handleLike}>
      <HeartSVG width="29" height="30" className={style} />
    </button>
  );
};

export default Like;
