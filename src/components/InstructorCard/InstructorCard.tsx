'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import ImagesViewer from './ImagesViewer';
import Like from '../Like/Like';
import Review from '../Review/Review';

interface InstructorCardProps {
  name: string;
  address: string;
  teamAffiliation: string;
  genres: string[];
  imgURL: string[];
  average: number;
  href: string;
}

const InstructorCard = ({
  name,
  address,
  genres,
  imgURL,
  average,
  teamAffiliation,
  href,
}: InstructorCardProps) => {
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
      className="relative h-60 w-[19.5rem] overflow-hidden rounded-md shadow-horizontal"
    >
      <figcaption
        className={`pointer-events-none absolute z-10 flex h-10 w-full items-center justify-center ${
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

          <figcaption className="pointer-events-none absolute bottom-0 z-10 flex h-16 w-full flex-col items-center justify-evenly bg-white/[.75] ">
            <Review average={average} />
            <div className="flex justify-center gap-1 whitespace-nowrap">
              <h2 className="w-24 overflow-hidden text-center">{address}</h2>
              <h2 className="w-24 overflow-hidden text-center">
                {teamAffiliation}
              </h2>
              {genres.length > 1 ? (
                <h2 className="w-24 overflow-hidden text-center">
                  {genres[0]} 외{genres.length - 1}
                </h2>
              ) : (
                <h2 className="w-24 overflow-hidden text-center">
                  {genres[0]}
                </h2>
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
