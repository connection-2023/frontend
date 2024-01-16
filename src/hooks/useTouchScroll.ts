import { useEffect, useRef, useState } from 'react';

interface useTouchScrollProps {
  scrollFast?: number;
  onChangeFn?: () => void;
}

const useTouchScroll = ({
  scrollFast = 1,
  onChangeFn,
}: useTouchScrollProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const mouseDownHandler = (e: MouseEvent) => {
      const element = e.target as Element;
      if (element.closest('[data-no-drag]')) {
        return;
      }
      isDown = true;
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    };

    const mouseLeaveHandler = () => {
      isDown = false;
    };

    const mouseUpHandler = () => {
      isDown = false;
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * scrollFast;
      scrollContainer.scrollLeft = scrollLeft - walk;
      setScrollLeft(scrollLeft - walk);
      if (onChangeFn) {
        onChangeFn();
      }
    };

    scrollContainer.addEventListener('mousedown', mouseDownHandler);
    scrollContainer.addEventListener('mouseleave', mouseLeaveHandler);
    scrollContainer.addEventListener('mouseup', mouseUpHandler);
    scrollContainer.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      scrollContainer.removeEventListener('mousedown', mouseDownHandler);
      scrollContainer.removeEventListener('mouseleave', mouseLeaveHandler);
      scrollContainer.removeEventListener('mouseup', mouseUpHandler);
      scrollContainer.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  return { scrollContainerRef, scrollLeft };
};

export default useTouchScroll;
