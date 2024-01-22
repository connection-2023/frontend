import Image from 'next/image';
import Link from 'next/link';
import { searchBestInstructor } from '@/lib/apis/serverApis/searchApis';
import { useUserStore } from '@/store';
import CarouselTemplate from '../CarouselTemplate';

const BestInstructor = async () => {
  const { userType } = useUserStore.getState();
  const resInstructorList = await searchBestInstructor(userType === 'user');

  const bestInstructorLists =
    resInstructorList.length < 9
      ? [
          ...resInstructorList,
          ...resInstructorList.slice(0, 9 - resInstructorList.length),
        ]
      : resInstructorList;

  return (
    <CarouselTemplate mode="instructor">
      {bestInstructorLists.map((list) => (
        <li key={list.id} className="h-full w-full">
          <Link
            href={`/instructor/${list.id}`}
            className="flex h-full flex-col"
          >
            <div className="relative flex-grow">
              <Image
                src={list.lecturerProfileImageUrl[0].url}
                alt="Connection 댄스 춤 이미지"
                fill
                sizes="(max-width: 720px) 60vw, (max-width: 1440px) 30vw"
                style={{ objectFit: 'cover' }}
                priority={true}
              />
            </div>
            <div className="flex h-6 items-center justify-center truncate bg-black text-sm text-white lg:h-8 lg:text-base lg:font-bold">
              {list.nickname}
            </div>
          </Link>
        </li>
      ))}
    </CarouselTemplate>
  );
};

export default BestInstructor;
