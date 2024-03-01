'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpSVG } from '@/icons/svg';
import Carousel from '../../../components/Carousel/Carousel';
import Accordion from '@/components/Accordion/Accordion';

interface BestInstructorsProps {
  list: { id: number; image: string; nickname: string }[];
}

const BestInstructors = ({ list }: BestInstructorsProps) => {
  const [focus, setFocus] = useState(false);
  const [view, setView] = useState(true);

  return (
    <article
      className={`flex flex-col gap-2 bg-black ${view ? 'pb-5' : 'pb-3'} pt-3`}
    >
      <h1 className="flex items-center px-4 font-semibold text-white sm:px-9 lg:text-lg xl:px-16">
        오늘의 인기 강사
        <button onClick={() => setView((prev) => !prev)}>
          <ArrowUpSVG
            className={`h-6 w-6 fill-white duration-300 sm:h-9 sm:w-9 ${
              !view && '-rotate-180'
            }`}
          />
        </button>
      </h1>
      <Accordion isOpen={view}>
        <div className="relative px-4 sm:px-9 xl:px-16">
          <div className="overflow-hidden">
            <div className="h-[4.75rem] w-[4.75rem] lg:h-[9.375rem] lg:w-[9.25rem]">
              <Carousel
                move={true}
                priority={10}
                gap={1}
                showCurrentElement={false}
                movePause={focus}
              >
                {list.map(({ id, image, nickname }) => (
                  <div
                    key={id}
                    onMouseOver={() => setFocus(true)}
                    onMouseLeave={() => setFocus(false)}
                    className="h-full w-full overflow-hidden rounded-md"
                  >
                    <Link
                      href={`/instructor/${id}`}
                      className="flex h-full flex-col"
                    >
                      <div className="relative flex-grow">
                        <Image
                          src={image}
                          alt="Connection 댄스 춤 이미지"
                          fill
                          sizes="(max-width: 720px) 60vw, (max-width: 1440px) 30vw"
                          style={{ objectFit: 'cover' }}
                          priority={true}
                        />
                      </div>
                      <div className="flex h-6 items-center justify-center truncate bg-white text-sm lg:h-8 lg:text-base lg:font-bold">
                        {nickname}
                      </div>
                    </Link>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </Accordion>
    </article>
  );
};

export default BestInstructors;
