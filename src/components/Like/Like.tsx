'use client';
import { HeartSVG } from '@/../public/icons/svg';

const Like = () => {
  return (
    <HeartSVG
      width="29"
      height="30"
      className="cursor-pointer hover:fill-main-color hover:stroke-main-color"
    />
  );
};

export default Like;
