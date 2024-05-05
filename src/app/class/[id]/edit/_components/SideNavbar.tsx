import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import { useState, useEffect, useRef } from 'react';
import { CLASS_EDIT_SECTIONS } from '@/constants/constants';
import { Button, UniqueButton } from '@/components/Button';

const SideNavbar = ({ onClick }: { onClick: () => void }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const router = useRouter();
  const path = usePathname();
  const postId = path.split('/')[2];

  useEffect(() => {
    CLASS_EDIT_SECTIONS.forEach((list) => {
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
        setActiveSection(
          CLASS_EDIT_SECTIONS[CLASS_EDIT_SECTIONS.length - 1].id,
        );
        return;
      }

      CLASS_EDIT_SECTIONS.forEach((section) => {
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

  const handleEditCancel = () => {
    const confirm = window.confirm('클래스 수정을 취소하겠습니까?');
    if (confirm) {
      router.push(`/class/${postId}`);
    }
  };

  return (
    <aside className="sticky top-0 z-20 hidden h-fit w-fit justify-self-center pt-16 text-lg font-bold md:block">
      <nav className="whitespace-nowrap text-lg font-bold">
        <ul className="mb-6 flex flex-col gap-y-8">
          {CLASS_EDIT_SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <Link
                href={`#${id}`}
                className={`${
                  activeSection === id ? 'text-sub-color1' : 'text-gray-500'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-20 text-base font-semibold">
        <Button type="submit" onClick={onClick} color="secondary" size="small">
          수정 완료
        </Button>
      </div>
      <div className="mt-2 w-20 text-base font-semibold">
        <UniqueButton onClick={handleEditCancel} color="secondary" size="small">
          수정 취소
        </UniqueButton>
      </div>
    </aside>
  );
};

export default SideNavbar;
