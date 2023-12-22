'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
    id,
    status,
    date,
    title,
    imgURL,
    location,
    genre,
    type,
    review,
    price,
    profile,
  } = props;
  const [focus, setFocus] = useState(false);
  const router = useRouter();
  const getStatusStyles =
    status === '모집중'
      ? 'border-gray-500 text-inherit'
      : 'border-gray-500 text-gray-500';

  // 현재는 제목 눌러서만 해당 게시글로 이동 가능
  const handleCardClick = () => {
    router.push(`/class/${id}`);
  };

  return (
    <>
      <div
        onMouseLeave={() => setFocus(false)}
        onMouseOver={() => setFocus(true)}
        className="hidden max-h-[13.5rem] w-full min-w-[20.5rem] cursor-pointer whitespace-nowrap rounded-lg p-3.5 shadow-horizontal hover:z-10 hover:scale-[1.02] sm:flex"
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
          <div className="mb-1 flex w-full items-center">
            <div
              className={`flex h-6 w-14 items-center justify-center border-2 border-solid text-sm font-bold ${getStatusStyles}`}
            >
              {status}
            </div>

            <ClassDates id={id} />

            <span className="text-sm">{date}</span>
            <div className="ml-auto">
              <Like type="class" id={id} />
            </div>
          </div>

          <Link
            href={`/class/${id}`}
            className="mb-1 line-clamp-1 w-full text-lg font-bold leading-normal text-black hover:underline"
          >
            {title}
          </Link>

          <div className="mb-2 flex w-full flex-wrap gap-x-3 text-sm">
            <span>{displayFirstElement(location)}</span>
            <span>{displayFirstElement(genre)}</span>
            <span>{type}</span>
          </div>

          {review && <Review average={review.average} count={review.count} />}

          <div className="mt-auto flex w-full items-center justify-between text-sm">
            <p className="text-lg font-bold text-black text-gray-100">
              {price.toLocaleString()}원
            </p>

            <ProfileImage
              src={profile?.src || null}
              nickname={profile.nickname}
              size="xsmall"
            />
          </div>
        </div>
      </div>

      <div className="h-full w-full sm:hidden">
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
