'use client';
import { useState } from 'react';
import Carousel from '@/components/Carousel/Carousel';

interface ICarouselTemplateProps {
  mode: 'class' | 'instructor';
  children: React.ReactNode;
}

const CarouselTemplate = ({ mode, children }: ICarouselTemplateProps) => {
  const [focus, setFocus] = useState(false);
  const width =
    mode === 'class'
      ? 'w-[13rem] xl:w-[30rem]'
      : 'h-[4.75rem] w-[4.75rem] lg:h-[9.375rem] lg:w-[9.25rem]';
  const height = mode === 'class' ? 'h-[14rem]' : 'h-24 md:h-[9.375rem]';
  const priority = mode === 'class' ? 5 : 8;

  const onFocus = () => {
    setFocus(true);
  };

  const offFocus = () => {
    setFocus(false);
  };

  return (
    <div className={`relative flex ${height} w-full justify-center px-2`}>
      <div className="flex h-full w-11/12 items-center overflow-hidden">
        <ul className={width} onMouseOver={onFocus} onMouseLeave={offFocus}>
          <Carousel
            move={true}
            showCurrentElement={false}
            carouselMoveIntervalTime={3000}
            priority={priority}
            gap={1}
            movePause={focus}
          >
            {children}
          </Carousel>
        </ul>
      </div>
    </div>
  );
};

export default CarouselTemplate;
