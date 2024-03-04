'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpSVG } from '@/icons/svg';
import { useUserStore } from '@/store/userStore';
import { getInstructorLinks, getUserLinks } from './MypageLinks';
import ProfileImage from '@/components/Profile/ProfileImage';

interface SidebarProps {
  view?: 'my' | 'dashboard';
}

const Sidebar = ({ view = 'my' }: SidebarProps) => {
  const pathname = usePathname();
  const { userType, authUser } = useUserStore();
  const isUser = userType === 'user';
  const isSubmenuActive = Boolean(
    (isUser ? getUserLinks('mypage') : getInstructorLinks('mypage')).find(
      (link) =>
        link.submenuItems &&
        link.submenuItems.some((item) => item.path === pathname),
    ),
  );
  const [isOpen, setIsOpen] = useState(isSubmenuActive);

  if (!authUser) return null;
  const { nickname } = authUser;
  const profileImg = authUser.profileImage;

  const getTextColorClass = (path: string) =>
    pathname.includes(path)
      ? 'group w-fit text-gray-100 is-actived'
      : 'w-fit text-gray-500 hover:text-gray-100';

  return (
    <nav
      className={`flex h-full flex-col items-start whitespace-nowrap rounded-lg bg-white ${
        view === 'my' ? 'max-w-[19.5rem] px-9 py-5' : 'w-full'
      }`}
    >
      {isUser ? (
        <div className="mb-5">
          <ProfileImage size="large" src={profileImg} label={false} />

          <p className="mt-4 text-lg font-bold text-gray-100">{nickname}님</p>
        </div>
      ) : (
        <div
          className={`mb-6 flex items-center gap-2 ${
            view === 'dashboard' && 'h-[3.3rem] w-full bg-gray-900 px-4'
          }`}
        >
          <ProfileImage size="small" src={profileImg} label={false} />

          <p className="text-lg font-bold text-gray-100">{nickname}</p>
        </div>
      )}

      <ul
        className={`flex flex-col gap-5 text-lg font-semibold ${
          view === 'dashboard' && 'px-4'
        }`}
      >
        {(isUser ? getUserLinks('mypage') : getInstructorLinks('mypage')).map(
          (link) => (
            <li key={link.path} className={getTextColorClass(link.path)}>
              <div className="flex items-center">
                <Link href={link.path} className="group flex items-center">
                  {link.icon}
                  {link.text}
                </Link>

                {link.submenuItems &&
                  (isOpen ? (
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      aria-label="내 클래스 메뉴 닫기"
                    >
                      <ArrowUpSVG
                        width="34"
                        height="34"
                        className="fill-sub-color1"
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      aria-label="내 클래스 메뉴 열기"
                    >
                      <ArrowUpSVG
                        width="34"
                        height="34"
                        className="origin-center rotate-180 fill-gray-500"
                      />
                    </button>
                  ))}
              </div>

              {link.submenuItems && (
                <ul
                  className={`${
                    isOpen
                      ? 'mt-2 max-h-48 opacity-100'
                      : 'hidden max-h-0 opacity-0'
                  } ml-8 flex flex-col gap-2.5 transition-all duration-300 ease-linear`}
                >
                  {link.submenuItems.map((item) => (
                    <li
                      key={item.path}
                      className={getTextColorClass(item.path)}
                    >
                      <Link href={item.path} className="flex items-center">
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ),
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
