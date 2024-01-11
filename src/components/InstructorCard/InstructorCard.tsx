'use client';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import ImagesViewer from './ImagesViewer';
import { StarSVG } from '../../../public/icons/svg';
import Like from '../Like/Like';
import Review from '../Review/Review';
import { Instructors } from '@/types/types';

interface InstructorCardProps extends Instructors {
  largeImg: boolean;
  isLiked: boolean;
  likeEvent?: (id: string | number) => void;
}

const InstructorCard = ({
  id,
  name,
  address,
  genres,
  imgURL,
  average,
  teamAffiliation,
  href,
  largeImg,
  isLiked,
  likeEvent,
}: InstructorCardProps) => {
  const [focus, setFocus] = useState(false);

  const onFocus = () => {
    setFocus(true);
  };

  const offFocus = () => {
    setFocus(false);
  };

  const genresWithSpace = genres.reduce(
    (acc, genre) => (acc += ` ${genre}`),
    '',
  );
  const genresWithSlash = genres.reduce(
    (acc, genre, index) =>
      (acc += index !== genres.length - 1 ? `/${genre}` : genre),
  );

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
        <Like
          id={id}
          type="instructor"
          isLiked={isLiked}
          likeEvent={likeEvent}
        />
      </div>

      <Link href={href}>
        <ImagesViewer imgURL={imgURL} focus={focus} />
      </Link>

      {!focus && (
        <>
          <div className="absolute bottom-24 flex w-full justify-center xl:bottom-[5rem]">
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

          <figcaption
            className={`${
              largeImg ? 'bg-white/[.9]' : 'bg-white sm:bg-white/[.8]'
            } pointer-events-none absolute bottom-0 z-10 flex h-[5.3125rem] w-full flex-col justify-center px-2 xl:h-[4.625rem] xl:items-center`}
          >
            <div className="hidden pb-2 pt-1 xl:block">
              <Review average={average} />
            </div>
            <div className="flex w-full items-center justify-between pb-1 xl:hidden">
              <p className="text-lg font-semibold">{name}</p>
              <div className="flex items-center gap-1">
                <StarSVG width={16} height={15} className="fill-sub-color1" />
                <p className="pb-0.5">{average}</p>
              </div>
            </div>
            <div
              className={`${
                largeImg
                  ? 'text-sm'
                  : 'text-xs text-gray-500 sm:text-sm sm:text-black'
              } mb-0.5 flex gap-x-2 xl:grid xl:grid-cols-2`}
            >
              <h2 className="whitespace-nowrap text-right">
                {address[0] +
                  (address.length > 1 ? ` 외 ${address.length - 1} |` : '')}
              </h2>
              <h2 className="flex-grow truncate">{teamAffiliation}</h2>
            </div>
            <div
              className={`${
                largeImg
                  ? 'gap-2 text-sm'
                  : 'text-xs text-gray-500 sm:gap-2 sm:text-sm sm:text-black'
              } xl:mx-auto xl:w-fit`}
            >
              <p className={`${!largeImg && 'hidden'} truncate sm:block`}>
                {genresWithSpace}
              </p>
              <p
                className={`${
                  largeImg ? 'hidden' : 'block'
                } truncate sm:hidden`}
              >
                {genresWithSlash}
              </p>
            </div>
          </figcaption>
        </>
      )}
    </div>
  );
};

export default InstructorCard;
