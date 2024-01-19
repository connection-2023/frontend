'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { HeartSVG } from '@/../public/icons/svg';
import { postClassLikes, deleteClassLikes } from '@/lib/apis/classApis';
import {
  instructorsLikeCancel,
  instructorsLikes,
} from '@/lib/apis/instructorLikesBlockApis';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { useUserStore } from '@/store/userStore';
import { FetchError } from '@/types/types';

interface LikeProps {
  id: string | number;
  type: 'class' | 'instructor';
  isLiked?: boolean;
  likeEvent?: (id: string | number) => void;
}

const Like = ({ id, type, isLiked, likeEvent }: LikeProps) => {
  const {
    likeClassList,
    likeInstructorList,
    setLikeClassList,
    setLikeInstructorList,
  } = useUserStore((state) => ({
    likeClassList: state.likeClassList,
    setLikeClassList: state.setLikeClassList,
    likeInstructorList: state.likeInstructorList,
    setLikeInstructorList: state.setLikeInstructorList,
  }));

  const [liked, setLiked] = useState(isLiked);
  const style = liked
    ? 'fill-main-color stroke-main-color'
    : 'hover:fill-main-color hover:stroke-main-color';

  useEffect(() => {
    if (type === 'class' && likeClassList.length > 0) {
      setLiked(likeClassList.includes(Number(id)));
    } else if (type === 'instructor' && likeInstructorList.length > 0) {
      setLiked(likeInstructorList.includes(Number(id)));
    }
  }, [likeClassList, likeInstructorList]);

  const handleLike = async () => {
    let retryFunc: () => Promise<any> = async () => {};

    try {
      if (type === 'class') {
        retryFunc = liked
          ? async () => {
              await deleteClassLikes(String(id));

              setLikeClassList(
                likeClassList.filter((classId) => id !== classId),
              );
            }
          : async () => {
              await postClassLikes(String(id));
              setLikeClassList([...likeClassList, Number(id)]);
            };
        await retryFunc();
        setLiked(!liked);
      } else {
        retryFunc = liked
          ? async () => {
              await instructorsLikeCancel(id);
              if (likeEvent) likeEvent(id);

              setLikeInstructorList(
                likeInstructorList.filter((classId) => id !== classId),
              );
            }
          : async () => {
              await instructorsLikes(id);
              setLikeInstructorList([...likeInstructorList, Number(id)]);
            };
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
    <button onClick={handleLike} aria-label="좋아요">
      <HeartSVG width="29" height="30" className={style} />
    </button>
  );
};

export default Like;
