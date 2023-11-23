'use client';
import Image from 'next/image';
import { useState } from 'react';
import ClassDates from './ClassDates';
import ResponsiveClassPreview from './ResponsiveClassPreview';
import Carousel from '../Carousel/Carousel';
import Like from '../Like/Like';
import ProfileImage from '../ProfileImage/ProfileImage';
import Review from '../Review/Review';
import { ClassCardType } from '@/types/class';

const ClassPreview = (props: ClassCardType) => {
  const {
    status,
    date,
    title,
    location,
    genre,
    type,
    time,
    review,
    price,
    profile,
    selectedDates,
    imgURL,
  } = props;
  const [focus, setFocus] = useState(false);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case '모집중':
        return 'border-gray-500 text-inherit';
      case '마감임박':
        return 'border-main-color text-main-color';
      case '마감':
        return 'border-gray-500 text-gray-500';
      default:
        return '';
    }
  };

  return (
    <>
      <div
        onMouseLeave={() => setFocus(false)}
        onMouseOver={() => setFocus(true)}
        className="hidden max-h-[13.5rem] w-full min-w-[20.5rem] cursor-pointer whitespace-nowrap rounded-lg p-3.5 shadow-horizontal hover:z-10 hover:scale-[1.02] xl:flex"
      >
        <div className="relative -z-10 mr-4 h-[188px] w-full overflow-hidden">
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
              width={0}
              height={0}
              sizes="(max-width: 720px) 60vw, (max-width: 1440px) 30vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          )}
        </div>

        <div className="flex w-full flex-col text-gray-100">
          <div className="mb-3 flex w-full items-center">
            <div
              className={`flex border-2 border-solid px-1.5 py-1.5 text-sm font-bold ${getStatusStyles(
                status,
              )}`}
            >
              {status}
            </div>

            <ClassDates selectedDates={selectedDates} />

            <span className="text-sm">{date}</span>
            <div className="ml-auto">
              <Like />
            </div>
          </div>

          <p className="mb-2 w-full text-ellipsis text-lg font-bold text-black">
            {title.length < 20 ? title : title.slice(0, 19) + '...'}
          </p>

          <div className="mb-2 flex w-full flex-wrap gap-3 text-sm">
            <span>{displayFirstElement(location)}</span>
            <span>{displayFirstElement(genre)}</span>
            <span>{displayFirstElement(type)}</span>
            <span>{displayFirstElement(time)}</span>
          </div>

          {review && <Review average={review.average} count={review.count} />}

          <div className="mt-auto flex w-full items-center justify-between text-sm">
            <p className="text-lg font-bold text-black text-gray-100">
              {price}원
            </p>

            <ProfileImage
              src={profile?.src || null}
              nickname={profile.nickname}
              size="small"
            />
          </div>
        </div>
      </div>

      <div className="h-full w-full xl:hidden">
        <ResponsiveClassPreview {...props} />
      </div>
    </>
  );
};

export default ClassPreview;

const displayFirstElement = <T extends { toString(): string }>(
  arr: T[],
): string => {
  return arr.length > 1
    ? `${arr[0].toString()} 외 ${arr.length - 1}`
    : arr[0].toString();
};
