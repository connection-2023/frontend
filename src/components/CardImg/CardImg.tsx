import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface CardImgProps {
  imgURL: string[];
  focus: boolean;
}

const CardImg = ({ imgURL, focus }: CardImgProps) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [loadedImagesCount, setLoadedImagesCount] = useState(1);
  const imgLength = imgURL.length;

  useEffect(() => {
    if (focus && loadedImagesCount < imgLength) {
      setLoadedImagesCount(imgLength);
    }
  }, [focus]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (focus) {
      timer = setInterval(() => {
        setCurrentImgIndex((prev) => (prev + 1 === imgLength ? 0 : prev + 1));
      }, 1000);
    } else {
      setCurrentImgIndex(0);
      if (timer) clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [focus, loadedImagesCount]);

  return (
    <div className="display: flex h-full">
      {imgURL.slice(0, loadedImagesCount).map((imgSrc, index) => {
        return (
          <div
            key={imgSrc}
            className="relative h-full w-full flex-shrink-0"
            style={{
              transform: `translateX(-${100 * currentImgIndex}%)`,
              transition: 'transform ease-out .3s',
            }}
          >
            <Image
              src={imgSrc}
              alt="Connection 댄스 이미지"
              fill
              priority={index === 0}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CardImg;
