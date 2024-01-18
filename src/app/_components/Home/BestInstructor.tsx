'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Carousel from '@/components/Carousel/Carousel';
import { searchBestInstructorData } from '@/types/instructor';

const BestInstructor = ({
  bestInstructorList,
}: {
  bestInstructorList: searchBestInstructorData[];
}) => {
  const [focus, setFocus] = useState(false);

  if (!bestInstructorList) return null;

  return (
    <div className="relative px-4 sm:px-9 xl:px-16">
      <div className="h-[4.75rem] w-[4.75rem] lg:h-[9.375rem] lg:w-[9.25rem]">
        <div className="overflow-hidden">
          <ul className="h-[4.75rem] w-[4.75rem] lg:h-[9.375rem] lg:w-[9.25rem]">
            <Carousel
              move={true}
              priority={10}
              gap={1}
              showCurrentElement={false}
              movePause={focus}
            >
              {bestInstructorList.map((list) => (
                <li
                  key={list.id}
                  onMouseOver={() => setFocus(true)}
                  onMouseLeave={() => setFocus(false)}
                  className="h-full w-full overflow-hidden rounded-md"
                >
                  <Link
                    href={`/instructor/${list.id}`}
                    className="flex h-full flex-col"
                  >
                    <div className="relative flex-grow">
                      <Image
                        src={list.lecturerProfileImageUrl[0].url}
                        alt="Connection 댄스 춤 이미지"
                        fill
                        sizes="(max-width: 720px) 60vw, (max-width: 1440px) 30vw"
                        style={{ objectFit: 'cover' }}
                        priority={true}
                      />
                    </div>
                    <div className="flex h-6 items-center justify-center truncate bg-white text-sm lg:h-8 lg:text-base lg:font-bold">
                      {list.nickname}
                    </div>
                  </Link>
                </li>
              ))}
            </Carousel>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BestInstructor;
