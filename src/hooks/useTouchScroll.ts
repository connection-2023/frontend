import { useEffect, useRef } from 'react';

const useTouchScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const mouseDownHandler = (e: MouseEvent) => {
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
      const walk = (x - startX) * 1;
      scrollContainer.scrollLeft = scrollLeft - walk;
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

  return { scrollContainerRef };
};

export default useTouchScroll;
