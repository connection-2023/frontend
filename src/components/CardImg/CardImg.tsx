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
      }, 1300);
    } else {
      setCurrentImgIndex(0);
      if (timer) clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [focus, loadedImagesCount]);

  return (
    <div className="display: relative flex h-full">
      {imgURL.slice(0, loadedImagesCount).map((imgSrc, index) => (
        <picture
          key={imgSrc}
          className="relative h-full w-full flex-shrink-0"
          style={{
            transform: `translateX(-${100 * currentImgIndex}%)`,
            transition: 'transform ease-out .5s',
          }}
        >
          <Image
            src={imgSrc}
            alt="Connection 댄스 이미지"
            fill
            sizes="(max-width: 720px) 40vw, (max-width: 1440px) 20vw"
            priority={index === 0}
          />
        </picture>
      ))}
      {focus && (
        <div className="display: absolute bottom-0 flex h-[10%] w-full items-center justify-center bg-black/[.5]">
          {imgURL.map((_, index) => (
            <span
              key={index}
              className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
                index < currentImgIndex + 1 ? 'bg-white' : 'bg-neutral-500'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardImg;
