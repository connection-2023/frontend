import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Arrow } from '../../../public/icons/svg';

interface CardImgProps {
  imgURL: string[];
  focus: boolean;
  arrow?: boolean;
  optimizationMode?: boolean;
}

let timer: NodeJS.Timeout | null = null;
const CardImg = ({
  imgURL: originalImgURL,
  focus,
  arrow = true,
  optimizationMode = true,
}: CardImgProps) => {
  const imgURL = [
    originalImgURL.at(-1),
    ...originalImgURL,
    ...originalImgURL.slice(0, 2),
  ];

  const imgLength = imgURL.length;

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [loadedImagesCount, setLoadedImagesCount] = useState(
    optimizationMode ? 1 : imgLength,
  );
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (focus && loadedImagesCount < imgLength) {
      setLoadedImagesCount(imgLength);
    }
  }, [focus]);

  useEffect(() => {
    if (focus) {
      timer = setInterval(() => {
        setCurrentImgIndex((prev) => {
          if (prev + 1 === imgLength - 2) {
            setIsAnimating(false);
            return 0;
          } else if (prev === 0) {
            setIsAnimating(true);
            return prev + 1;
          } else {
            return prev + 1;
          }
        });
      }, 1300);
    } else {
      setCurrentImgIndex(0);
      if (timer) clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [focus, loadedImagesCount, isAnimating]);

  const goBackward = () => {
    setIsAnimating(false);
    setCurrentImgIndex((prev) =>
      prev === 0 ? originalImgURL.length - 1 : prev - 1,
    );
    if (timer) clearInterval(timer);
    setTimeout(() => setIsAnimating(true), 1300);
  };

  const goForward = () => {
    setIsAnimating(false);
    setCurrentImgIndex((prev) =>
      prev === originalImgURL.length - 1 ? 0 : prev + 1,
    );
    if (timer) clearInterval(timer);
    setTimeout(() => setIsAnimating(true), 1300);
  };

  return (
    <div className="display: flex h-full ">
      {imgURL.slice(0, loadedImagesCount).map((imgSrc, index) => (
        <picture
          key={index}
          className="relative h-full w-full flex-shrink-0"
          style={{
            transform: `translateX(-${100 * currentImgIndex}%)`,
            transition: isAnimating ? 'transform ease-out 1.1s' : 'none',
          }}
        >
          {imgSrc && (
            <Image
              src={imgSrc}
              alt="Connection 댄스 이미지"
              fill
              sizes="(max-width: 720px) 60vw, (max-width: 1440px) 30vw"
              priority={index === 0 || !optimizationMode}
            />
          )}
        </picture>
      ))}

      {focus && (
        <div className="display: absolute bottom-0 flex h-[10%] w-full items-center justify-center bg-black/[.5]">
          {originalImgURL.map((_, index) => (
            <span
              key={index}
              className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
                index === 0 ||
                (currentImgIndex < originalImgURL.length &&
                  index <= currentImgIndex)
                  ? 'bg-white'
                  : 'bg-neutral-500'
              }`}
            />
          ))}
        </div>
      )}

      {focus && arrow && (
        <>
          <Arrow
            onClick={goBackward}
            className="absolute left-3 top-1/2 -translate-y-1/2 -scale-x-100 transform cursor-pointer"
          >
            뒤로
          </Arrow>
          <Arrow
            onClick={goForward}
            className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
          >
            앞으로
          </Arrow>
        </>
      )}
    </div>
  );
};

export default CardImg;
