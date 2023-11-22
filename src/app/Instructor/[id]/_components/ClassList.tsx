'use client';
import { useState } from 'react';
import Carousel from '@/components/Carousel/Carousel';
import ClassCard from '@/components/ClassPreview/ClassPreview';
import { ClassCardType } from '@/types/class';

const ClassList = ({ classList }: { classList: ClassCardType[] }) => {
  const [focus, setFocus] = useState(false);

  const onFocus = () => {
    setFocus(true);
  };

  const offFocus = () => {
    setFocus(false);
  };

  return (
    <div className="relative flex h-60 w-full max-w-[56.2rem] justify-center ">
      <div className="flex h-full w-11/12 items-center overflow-hidden">
        <div
          className="w-[30rem]"
          onMouseOver={onFocus}
          onMouseLeave={offFocus}
        >
          <Carousel
            move={true}
            showCurrentElement={false}
            carouselMoveIntervalTime={3000}
            priority={2}
            gap={2}
            movePause={focus}
          >
            {classList.map((state, index) => {
              return <ClassCard key={state.title + index} {...state} />;
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ClassList;
