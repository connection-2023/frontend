'use client';
import React, { useState } from 'react';
import { ArrowDownSVG } from '@/icons/svg';
import Accordion from '@/components/Accordion/Accordion';
import Carousel from '@/components/Carousel/Carousel';
import ClassPreview from '@/components/ClassPreview/ClassPreview';
import { ClassCardType } from '@/types/class';

const BestlCasses = ({ bestClassList }: { bestClassList: ClassCardType[] }) => {
  const [focus, setFocus] = useState(false);
  const [view, setView] = useState(true);

  return (
    <article
      className={`flex flex-col gap-2 bg-black ${view ? 'pb-5' : 'pb-3'} pt-3`}
    >
      <h1 className="flex items-center px-4 font-semibold text-white sm:px-9 lg:text-lg xl:px-16">
        오늘의 인기 클래스
        <button onClick={() => setView((prev) => !prev)}>
          <ArrowDownSVG
            className={`h-6 w-6 fill-white duration-300 sm:h-9 sm:w-9 ${
              view && '-rotate-180'
            }`}
          />
        </button>
      </h1>

      <Accordion isOpen={view}>
        <div className="relative px-4 sm:px-9 xl:px-12">
          <div className="overflow-hidden">
            <ul className="h-[14rem] w-[13rem]">
              <Carousel
                move={true}
                priority={6}
                gap={1}
                showCurrentElement={false}
                movePause={focus}
              >
                {bestClassList.map((classData) => {
                  const data = { ...classData, darkMode: true };
                  return (
                    <li
                      key={classData.id}
                      onMouseOver={() => setFocus(true)}
                      onMouseLeave={() => setFocus(false)}
                      className="w-full max-w-[13rem] xl:max-w-[33.7rem]"
                    >
                      <ClassPreview {...data} />
                    </li>
                  );
                })}
              </Carousel>
            </ul>
          </div>
        </div>
      </Accordion>
    </article>
  );
};

export default BestlCasses;
