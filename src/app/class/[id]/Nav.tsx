'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const Nav = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const sections = [
    { id: 'intro-section', label: '클래스 소개' },
    { id: 'date-section', label: '일정 및 시간' },
    { id: 'location-section', label: '진행 장소' },
    { id: 'review-section', label: '후기' },
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

    sections.forEach(({ id }) => {
      const elem = document.getElementById(id);
      if (elem) observer.observe(elem);
      sectionRefs.current[id] = elem;
    });

    return () => {
      sections.forEach(({ id }) => {
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
      {sections.map(({ id, label }) => (
        <Link
          key={id}
          href={`#${id}`}
          ref={(ref) => (sectionRefs.current[id] = ref)}
          className={`${
            activeSection === id
              ? 'text-sub-color1 underline underline-offset-8'
              : 'text-[#B6B6B6]'
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
