'use client';
import { useState } from 'react';
import Carousel from '@/components/Carousel/Carousel';

interface ICarouselTemplateProps {
  mode: 'class' | 'instructor';
  children: React.ReactNode;
}

const CarouselTemplate = ({ mode, children }: ICarouselTemplateProps) => {
  const [focus, setFocus] = useState(false);
  const width = mode === 'class' ? 'w-[30rem]' : 'w-[9.25rem]';
  const height = mode === 'class' ? 'h-[14rem]' : 'h-[6.5rem]';

  const onFocus = () => {
    setFocus(true);
  };

  const offFocus = () => {
    setFocus(false);
  };
  return (
    <div className={`relative flex ${height} w-full justify-center px-2`}>
      <div className="flex h-full w-11/12 items-center overflow-hidden">
        <div className={width} onMouseOver={onFocus} onMouseLeave={offFocus}>
          <Carousel
            move={true}
            showCurrentElement={false}
            carouselMoveIntervalTime={3000}
            priority={8}
            gap={1}
            movePause={focus}
          >
            {children}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CarouselTemplate;
