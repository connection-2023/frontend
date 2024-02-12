'use client';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

interface NavSection {
  id: string;
  label: string;
}

const Nav = ({ sections }: { sections: NavSection[] }) => {
  const [activeId, setActiveId] = useState<null | string>(null);
  const [headingTops, setHeadingTops] = useState<
    | null
    | {
        id: string;
        top: number;
      }[]
  >(null);

  const updateSectionPositions = useCallback(() => {
    const scrollTop = getScrollTop();
    const headingTops = sections.map(({ id }) => {
      const el = document.getElementById(id);

      if (!el) {
        return {
          id,
          top: 0,
        };
      }
      const top = el.getBoundingClientRect().top + scrollTop;

      return {
        id,
        top,
      };
    });

    setHeadingTops(headingTops);
  }, [sections]);

  useEffect(() => {
    updateSectionPositions();

    let prevScrollHeight = document.body.scrollHeight;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const checkScrollHeight = () => {
      const scrollHeight = document.body.scrollHeight;
      if (prevScrollHeight !== scrollHeight) {
        updateSectionPositions();
      }
      prevScrollHeight = scrollHeight;
      timeoutId = setTimeout(checkScrollHeight, 250);
    };
    timeoutId = setTimeout(checkScrollHeight, 250);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [updateSectionPositions]);

  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();
    if (!headingTops) return;
    const currentHeading = [...headingTops]
      .reverse()
      .find((headingTop) => scrollTop >= headingTop.top - 500);

    if (!currentHeading) {
      setActiveId(null);
      return;
    }

    setActiveId(currentHeading.id);
  }, [headingTops]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <nav className="sticky top-0 z-20 mb-3.5 flex h-16 w-full items-center justify-between gap-5 whitespace-nowrap bg-white text-lg font-bold sm:gap-0">
      {sections.map(({ id, label }) => (
        <Link
          key={id}
          href={`#${id}`}
          className={`${
            activeId === id
              ? 'text-sub-color1 underline underline-offset-8'
              : 'text-gray-500'
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;

export const getScrollTop = () => {
  if (!document.body) return 0;
  const scrollTop = document.documentElement
    ? document.documentElement.scrollTop || document.body.scrollTop
    : document.body.scrollTop;
  return scrollTop;
};
