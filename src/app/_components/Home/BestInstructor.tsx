import Image from 'next/image';
import Link from 'next/link';
import CarouselTemplate from '../CarouselTemplate';
import { searchBestInstructorData } from '@/types/instructor';

const BestInstructor = ({
  bestInstructorList,
}: {
  bestInstructorList: searchBestInstructorData[];
}) => {
  if (!bestInstructorList) return null;

  return (
    <CarouselTemplate mode="instructor">
      {bestInstructorList.map((list) => (
        <li key={list.id} className="h-full w-full overflow-hidden rounded-md">
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
            <div className="flex h-6 items-center justify-center truncate bg-white text-sm lg:h-8 lg:text-base lg:font-bold">
              {list.nickname}
            </div>
          </Link>
        </li>
      ))}
    </CarouselTemplate>
  );
};

export default BestInstructor;
