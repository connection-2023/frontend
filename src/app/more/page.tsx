import { cookies } from 'next/headers';
import Link from 'next/link';
import {
  getInstructorLinks,
  getUserLinks,
} from '@/app/_components/MypageLinks';
import UserProfile from './userProfile';

const MorePage = () => {
  const cookieStore = cookies();
  const lecturer = cookieStore.get('lecturerAccessToken')?.value;
  const isUser = lecturer === undefined;

  return (
    <div>
      <UserProfile />

      <ul className="flex flex-col divide-y divide-solid divide-gray-500 px-4 text-lg font-medium text-black">
        {(isUser ? getUserLinks('more') : getInstructorLinks('more')).map(
          (link, index) =>
            link.submenuItems ? (
              link.submenuItems?.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="flex w-full items-center gap-3 px-1 py-3"
                  >
                    <div className="w-5">{item.icon}</div>
                    {item.text}
                  </Link>
                </li>
              ))
            ) : (
              <li
                key={link.path + index}
                className="flex items-center px-1 py-3"
              >
                <Link
                  href={link.path}
                  className="flex w-full items-center gap-3"
                >
                  <div className="w-5">{link.icon}</div>
                  {link.text}
                </Link>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default MorePage;
