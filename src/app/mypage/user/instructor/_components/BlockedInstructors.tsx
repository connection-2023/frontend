import Link from 'next/link';
import ProfileImage from '@/components/ProfileImage/ProfileImage';
import { InstructorBlock } from '@/types/instructor';

interface BlockedInstructorsProps {
  instructors: InstructorBlock[];
}

const BlockedInstructors = ({ instructors }: BlockedInstructorsProps) => (
  <ul className="flex w-full min-w-[18.75rem] flex-col sm:w-5/12">
    {instructors.map(({ nickname, imgURL, id }, index) => {
      return (
        <li
          key={nickname + index}
          className="flex justify-between border-y border-solid border-gray-700 py-4"
        >
          <Link href={`/instructor/${id}`}>
            <ProfileImage
              size="small"
              src={imgURL[0]}
              nickname={nickname}
              marginLeft={2}
            />
          </Link>
          <div className="flex gap-8 text-gray-100 sm:gap-16">
            <button>차단취소</button>
            <button>신고</button>
          </div>
        </li>
      );
    })}
  </ul>
);

export default BlockedInstructors;
