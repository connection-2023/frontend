'use client';
import Image from 'next/image';
import { useState } from 'react';
import Date from './Date';
import { ClassCardType } from '../../types/class';
import Carousel from '../Carousel/Carousel';
import Like from '../Like/Like';
import ProfileImage from '../ProfileImage/ProfileImage';
import Review from '../Review/Review';

const ClassCard = (props: ClassCardType) => {
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
        return 'border-sub-color2 text-inherit';
      case '마감임박':
        return 'border-main-color text-main-color';
      case '마감':
        return 'border-sub-color2 text-sub-color2';
      default:
        return '';
    }
  };
  return (
    <div
      className="flex max-h-[13.5rem] w-full max-w-[40rem] cursor-pointer whitespace-nowrap p-3.5 shadow-[1px_1px_4px_-1px_rgba(0,0,0,0.25)] hover:scale-[1.02]"
      onMouseLeave={() => setFocus(false)}
      onMouseOver={() => setFocus(true)}
    >
      <div className="relative mr-4 h-[188px] w-full overflow-hidden">
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
      </div>
      <div className="flex w-full flex-col text-sub-color3">
        <div className="mb-3 flex w-full items-center">
          <div
            className={`flex border-2 border-solid px-1.5 py-1.5 text-sm font-bold ${getStatusStyles(
              status,
            )}`}
          >
            {status}
          </div>

          <Date selectedDates={selectedDates} />

          <span className="text-sm">{date}</span>
          <div className="ml-auto">
            <Like />
          </div>
        </div>
        <p className="mb-2 w-full text-ellipsis text-lg font-bold text-black">
          {title.length < 20 ? title : title.slice(0, 19) + '...'}
        </p>
        <div className="mb-2 flex w-full flex-wrap justify-between text-sm">
          <span>
            {location.length > 1
              ? location[0] + ' 외 ' + (location.length - 1)
              : location[0]}
          </span>
          <span>
            {genre.length > 1
              ? genre[0] + ' 외 ' + (genre.length - 1)
              : genre[0]}
          </span>
          <span>
            {type.length > 1 ? type[0] + ' 외 ' + (type.length - 1) : type[0]}
          </span>
          <span>
            {time.length > 1 ? time[0] + ' 외 ' + (time.length - 1) : time[0]}
          </span>
        </div>
        <div>
          {review && <Review average={review.average} count={review.count} />}
        </div>
        <div className="mt-auto flex w-full items-center justify-between text-sm">
          <p className="text-lg font-bold text-black text-sub-color3">
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
  );
};

export default ClassCard;
