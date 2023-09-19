'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Arrow } from '../../../public/icons/svg';

/**
 * CarouselProps Interface
 *
 * 사용법 1
 * <relative overflow-hidden 컨테이너>
 *  <이미지 크기 제어 컨테이너>
 *    <Carousel/>
 *  </이미지 크기 제어 컨테이너>
 * </ relative overflow-hidden 컨테이너>
 *
 * 사용법 2
 * <이미지 크기 제어 및 relative overflow-hidden>
 *   <Carousel/>
 * </ 이미지 크기 제어 및 relative overflow-hidden>
 *
 * 사용법 3
 * <relative overflow-hidden 컨테이너>
 *  <이미지 크기 제어 컨테이너>
 *    <Carousel>
 *      ...children 요소
 *    </Carousel>
 *  </이미지 크기 제어 컨테이너>
 * </ relative overflow-hidden 컨테이너>
 *
 * @property {string[]} imgURL - 표시할 이미지들의 URL들이 담긴 배열, children 우선 렌더
 * @property {React.ReactNode} children - 표시할 요소들, imgURL 보다 우선순위 높음
 * @property {boolean} move - 캐러셀 움직임 활성화
 * @property {boolean} [arrow=true] - 탐색을 위해 화살표를 표시해야 하는지 여부를 나타내는 선택적 플래그 (기본값 = true)
 * @property {boolean} [priority=1] - 해당 숫자 만큼 요소를 미리 렌더 (기본값 = 1)
 * @property {boolean} [showCurrentElement =true] - 현재 캐러셀 위치 표시의 상태창 표시 여부를 나타내는 선택적 플래그 (기본값 = true)
 * @property {boolean} [showCurrentElementBackGround =true] - 상태창 표시 배경 여부를 나타내는 선택적 플래그 (기본값 = true)
 * @property {number} [gap=0] - 캐러셀 요소 사이의 간격을 rem으로 지정하는 선택적 숫자 (기본값 = 0)
 * @property {number} [carouselMoveIntervalTime = 2000] - 캐러셀 움직이는 시간을 ms로 지정하는 선택적 숫자 (기본값 = 2000ms)
 * @property {number} [arrowPushMoveWaitTime = 2000] - Arrow를 누른 후 캐러셀 움직임을 멈추는 시간을 ms로 지정하는 선택적 숫자 (기본값 = 2000ms)
 * @property {boolean} [movePause = false] - 캐러셀의 움직임을 true 동안 일시정지 (기본값 = false)
 */

interface Props {
  move: boolean;
  arrow?: boolean;
  priority?: number;
  showCurrentElement?: boolean;
  showCurrentElementBackGround?: boolean;
  gap?: number;
  carouselMoveIntervalTime?: number;
  arrowPushMoveWaitTime?: number;
  movePause?: boolean;
}

interface ChildrenProps extends Props {
  children: React.ReactNode;
  imgURL?: string[];
}

interface ImgURLProps extends Props {
  imgURL: string[];
  children?: React.ReactNode;
}

type CarouselProps = ChildrenProps | ImgURLProps;

const Carousel = ({
  imgURL,
  move,
  arrow = true,
  priority = 1,
  showCurrentElement = true,
  gap = 0,
  children,
  showCurrentElementBackGround = true,
  carouselMoveIntervalTime = 2000,
  arrowPushMoveWaitTime = 2000,
  movePause = false,
}: CarouselProps) => {
  const childrenArray = React.Children.toArray(children);
  const extendForCarousel = (elementArr: React.ReactNode[] | string[]) => {
    return [elementArr.at(-1), ...elementArr, ...elementArr.slice(0, 2)];
  };

  const carouselElements = extendForCarousel(
    children ? [...childrenArray] : [...(imgURL || [])],
  );
  const carouselLength = carouselElements.length;
  const originalElements = children ? childrenArray : [...(imgURL || [])];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedElementCount, setLoadedElementCount] = useState(
    priority > 1 ? priority : 1,
  );
  const [isAnimating, setIsAnimating] = useState(true);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  if (move && loadedElementCount < carouselLength) {
    setLoadedElementCount(carouselLength);
  }

  const updateImageIndex = () => {
    setCurrentIndex((prev) => {
      if (prev + 1 === carouselLength - 2) {
        setIsAnimating(false);
        return 0;
      } else if (prev === 0) {
        setIsAnimating(true);
        return prev + 1;
      } else {
        return prev + 1;
      }
    });
  };

  useEffect(() => {
    if (movePause && intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    } else {
      if (move) {
        setIsAnimating(true);
        if (priority === 1) {
          timeoutIdRef.current = setTimeout(() => updateImageIndex(), 100);
        }
        intervalIdRef.current = setInterval(
          updateImageIndex,
          carouselMoveIntervalTime,
        );
      } else {
        setIsAnimating(false);
        setCurrentIndex(0);
        setTimeout(() => setIsAnimating(true), 100);
        if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      }
    }

    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [move, loadedElementCount, movePause]);

  const changeImage = (
    event: React.MouseEvent,
    direction: 'BACKWARD' | 'FORWARD',
  ) => {
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    event.stopPropagation();
    event.nativeEvent.preventDefault();

    setIsAnimating(false);
    setCurrentIndex((prev) =>
      direction === 'BACKWARD'
        ? prev <= 0
          ? carouselLength - 4
          : prev - 1
        : prev >= carouselLength - 4
        ? 0
        : prev + 1,
    );

    timeoutIdRef.current = setTimeout(() => {
      setIsAnimating(true);
      intervalIdRef.current = setInterval(
        updateImageIndex,
        carouselMoveIntervalTime,
      );
    }, arrowPushMoveWaitTime);
  };

  return (
    <>
      <div
        className={`display: flex h-full ${
          isAnimating && 'transition-transform duration-[1600ms] ease-out'
        }`}
        style={{
          transform: `translateX(calc(-${100 * currentIndex}% - ${
            gap * currentIndex
          }rem)`,
          gap: `${gap}rem`,
        }}
      >
        {carouselElements.slice(0, loadedElementCount).map((element, index) => (
          <picture
            key={index}
            className={`relative h-full w-full flex-shrink-0 `}
          >
            {children
              ? element
              : typeof element === 'string' && (
                  <Image
                    src={element}
                    alt="Connection 댄스 춤 이미지"
                    fill
                    sizes="(max-width: 720px) 60vw, (max-width: 1440px) 30vw"
                    priority={index < priority}
                    style={{ objectFit: 'cover' }}
                  />
                )}
          </picture>
        ))}
      </div>
      {showCurrentElement && (
        <div
          className={`display: absolute bottom-0 flex h-[10%] w-full items-center justify-center ${
            showCurrentElementBackGround && 'bg-black/[.5]'
          } `}
        >
          {originalElements.map((_, index) => (
            <span
              key={index}
              className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
                index === 0 ||
                (currentIndex < originalElements.length &&
                  index <= currentIndex)
                  ? 'bg-white'
                  : 'bg-neutral-500'
              }`}
            />
          ))}
        </div>
      )}

      {arrow && (
        <>
          <Arrow
            onClick={(e: React.MouseEvent) => changeImage(e, 'BACKWARD')}
            className="absolute left-3 top-1/2 -translate-y-1/2 -scale-x-100 transform cursor-pointer"
          />
          <Arrow
            onClick={(e: React.MouseEvent) => changeImage(e, 'FORWARD')}
            className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
          />
        </>
      )}
    </>
  );
};

export default Carousel;
