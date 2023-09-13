'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const Nav = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const sections = [
    'intro-section',
    'date-section',
    'location-section',
    'review-section',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.9 },
    );

    sections.forEach((id) => {
      const elem = document.getElementById(id);
      if (elem) observer.observe(elem);
      sectionRefs.current[id] = elem;
    });

    return () => {
      sections.forEach((id) => {
        const elem = sectionRefs.current[id];
        if (elem) observer.unobserve(elem);
      });
    };
  }, []);

  const handleNavLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const targetId = event.currentTarget.getAttribute('href');

    if (targetId) {
      const targetElement = sectionRefs.current[targetId.replace('#', '')];

      if (targetElement) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        setActiveSection(targetId.replace('#', ''));
      }
    }
  };

  return (
    <nav
      onClick={handleNavLinkClick}
      className="sticky top-0 mb-[0.87rem] flex h-[64px] w-full items-center justify-between scroll-smooth whitespace-nowrap bg-white text-lg font-bold text-[#B6B6B6]"
    >
      <Link
        href="#intro-section"
        ref={(ref) => (sectionRefs.current['intro-section'] = ref)}
        className={`${
          activeSection === 'intro-section'
            ? 'text-sub-color1 underline underline-offset-8'
            : 'text-[#B6B6B6]'
        }`}
      >
        클래스 소개
      </Link>
      <Link
        href="#date-section"
        ref={(ref) => (sectionRefs.current['date-section'] = ref)}
        className={`${
          activeSection === 'date-section'
            ? 'text-sub-color1 underline underline-offset-8'
            : 'text-[#B6B6B6]'
        }`}
      >
        일정 및 시간
      </Link>
      <Link
        href="#location-section"
        ref={(ref) => (sectionRefs.current['location-section'] = ref)}
        className={`${
          activeSection === 'location-section'
            ? 'text-sub-color1 underline underline-offset-8'
            : 'text-[#B6B6B6]'
        }`}
      >
        진행 장소
      </Link>
      <Link
        href="#review-section"
        ref={(ref) => (sectionRefs.current['review-section'] = ref)}
        className={`${
          activeSection === 'review-section'
            ? 'text-sub-color1 underline underline-offset-8'
            : 'text-[#B6B6B6]'
        }`}
      >
        후기
      </Link>
    </nav>
  );
};

export default Nav;
