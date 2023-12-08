'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { StarSVG } from '@/icons/svg';
import ImagesViewer from './ImagesViewer';
import Like from '../Like/Like';
import Rating from '../Review/Rating';
import Review from '../Review/Review';
import { Instructors } from '@/types/types';

const InstructorCard = ({
  name,
  address,
  genres,
  imgURL,
  average,
  teamAffiliation,
  href,
}: Instructors) => {
  const [focus, setFocus] = useState(false);

  const onFocus = () => {
    setFocus(true);
  };

  const offFocus = () => {
    setFocus(false);
  };

  return (
    <div
      onMouseOver={onFocus}
      onMouseLeave={offFocus}
      className="relative h-full w-full overflow-hidden rounded-md shadow-horizontal"
    >
      <figcaption
        className={`pointer-events-none absolute z-10 hidden h-10 w-full items-center justify-center xl:flex ${
          focus ? 'bg-black' : 'bg-white'
        }`}
      >
        <h1 className={`text-lg font-bold ${focus && 'text-zinc-50'}`}>
          {name}
        </h1>
      </figcaption>

      <div className="pointer-events-auto absolute right-1 top-1 z-10">
        <Like />
      </div>

      <Link href={href}>
        <ImagesViewer imgURL={imgURL} focus={focus} />
      </Link>

      {!focus && (
        <>
          <div className="display: absolute bottom-[4.2rem] flex w-full justify-center">
            {imgURL.map((img, index) => {
              return (
                <span
                  key={img + index}
                  className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
                    index === 0 ? 'bg-white' : 'bg-neutral-500'
                  }`}
                />
              );
            })}
          </div>

          <figcaption className="pointer-events-none absolute bottom-0 z-10 flex h-16 w-full flex-col justify-evenly bg-white/[.75] px-1 xl:items-center">
            <div className="hidden xl:block">
              <Review average={average} />
            </div>
            <div className="flex w-full justify-between xl:hidden">
              <p className="text-lg font-semibold">{name}</p>
              <div className="flex gap-1">
                <StarSVG
                  width={16}
                  height={15}
                  className="translate-y-1 fill-sub-color1"
                />
                5.0
              </div>
            </div>
            <div className="flex w-full gap-3 whitespace-nowrap sm:text-sm lg:text-base">
              <h2 className="xl:w-1/3">{address}</h2>
              <h2 className="max-w-[30%] truncate xl:w-1/3">
                {teamAffiliation}
              </h2>
              {genres.length > 1 ? (
                <>
                  <h2 className="xl:w-1/3">
                    {genres[0]} 외{genres.length - 1}
                  </h2>
                  <h2 className="" />
                </>
              ) : (
                <h2 className="xl:w-1/3">{genres[0]}</h2>
              )}
            </div>
          </figcaption>
        </>
      )}
    </div>
  );
};

export default InstructorCard;
//수정 할 부분 map key, 마진
