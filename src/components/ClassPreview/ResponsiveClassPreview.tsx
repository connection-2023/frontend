'use client';
import Image from 'next/image';
import { useState } from 'react';
import { StarSVG } from '@/icons/svg';
import Carousel from '../Carousel/Carousel';
import ProfileImage from '../ProfileImage/ProfileImage';
import { ClassCardType } from '@/types/class';

const ResponsiveClassPreview = (props: ClassCardType) => {
  const { status, date, title, genre, review, price, profile, imgURL } = props;
  const [focus, setFocus] = useState(false);

  return (
    <div
      onMouseLeave={() => setFocus(false)}
      onMouseOver={() => setFocus(true)}
      className="flex min-w-[20.5rem] flex-col font-medium"
    >
      <div className="relative aspect-[328/212] overflow-hidden rounded-[0.63rem]">
        {imgURL.length > 1 ? (
          <Carousel
            imgURL={imgURL}
            move={focus}
            arrow={focus}
            showCurrentElement={focus}
          />
        ) : (
          <Image
            src={imgURL[0]}
            alt="Connection 댄스 춤 이미지"
            fill
            sizes="(max-width: 720px) 60vw, (max-width: 1440px) 30vw"
          />
        )}

        <div className="z-5 absolute top-0 flex h-[3.5rem] w-full items-baseline gap-2 whitespace-nowrap rounded-[0.63rem] bg-gradient-to-b from-[rgba(32,32,35,0.5)] to-[rgba(32,32,35,0)] pl-2.5 pt-2.5 text-sm font-semibold text-white">
          <span className="rounded-[0.31rem] border border-solid bg-black/[.7] px-[0.33rem] py-[0.18rem]">
            {status}
          </span>
          <span className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            {date}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-start justify-between">
        <h1 className="w-5/6 whitespace-pre-line text-base font-semibold leading-5">
          {title}
        </h1>
        <div className="flex items-center gap-1 text-sub-color3">
          <StarSVG width={13} height={12} className="fill-sub-color1" />
          {review?.average}
        </div>
      </div>
      <span className="mt-1 text-xs text-sub-color2">
        {genre.length > 1 ? genre[0] + ' 외 ' + (genre.length - 1) : genre[0]}
      </span>
      <div className="mt-0.5 flex items-center justify-between text-base text-sub-color3">
        <p className="text-lg font-bold"> {price}</p>

        <ProfileImage
          size="xsmall"
          src={profile?.src || null}
          nickname={profile.nickname}
        />
      </div>
    </div>
  );
};

export default ResponsiveClassPreview;
