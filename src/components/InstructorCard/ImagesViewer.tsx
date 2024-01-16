import React from 'react';
import Carousel from '../Carousel/Carousel';

const ImagesViewer = ({
  imgURL,
  focus,
}: {
  imgURL: string[];
  focus: boolean;
}) => {
  return (
    <figure className="h-full w-full">
      <Carousel
        imgURL={imgURL}
        move={focus}
        arrow={imgURL.length > 1 && focus}
        showCurrentElement={focus}
      />
    </figure>
  );
};

export default ImagesViewer;
