'use client';
import { useState } from 'react';
import { HeartSVG } from '@/../public/icons/svg';
import { postClassLikes, deleteClassLikes } from '@/lib/apis/classApis';

interface LikeProps {
  id: string | number;
  type: 'class' | 'instructor';
  isLiked?: boolean;
}

const Like = ({ id, type, isLiked }: LikeProps) => {
  const [liked, setLiked] = useState(isLiked);
  const style = liked
    ? 'fill-main-color stroke-main-color'
    : 'hover:fill-main-color hover:stroke-main-color';

  const handleLike = async () => {
    if (type === 'class') {
      if (liked) {
        await deleteClassLikes(String(id));
      } else {
        await postClassLikes(String(id));
      }
      setLiked(!liked);
    }
  };

  return (
    <button onClick={handleLike}>
      <HeartSVG width="29" height="30" className={style} />
    </button>
  );
};

export default Like;
