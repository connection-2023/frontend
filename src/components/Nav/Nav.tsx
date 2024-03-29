'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

interface NavSection {
  id: string;
  label: string;
}

const Nav = ({ sections }: { sections: NavSection[] }) => {
  const [activeSection, setActiveSection] = useState('');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    sections.forEach((list) => {
      const elem = document.getElementById(list.id);
      sectionRefs.current[list.id] = elem;
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      let minDiff = Infinity;
      let closestSection = '';

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 80
      ) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      sections.forEach((section) => {
        const elem = sectionRefs.current[section.id];

        if (elem) {
          const rect = elem.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const diff = Math.abs(sectionTop - currentScrollY - 160);

          if (diff < minDiff) {
            minDiff = diff;
            closestSection = section.id;
          }
        }
      });

      setActiveSection(closestSection);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-20 mb-3.5 flex h-16 w-full items-center justify-between gap-5 whitespace-nowrap bg-white text-lg font-bold sm:gap-0">
      {sections.map(({ id, label }) => (
        <Link
          key={id}
          href={`#${id}`}
          className={`${
            activeSection === id
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
