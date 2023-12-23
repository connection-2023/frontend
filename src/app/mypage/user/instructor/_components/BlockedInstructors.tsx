import Image from 'next/image';
import ProfileImage from '@/components/ProfileImage/ProfileImage';
import { Instructors } from '@/types/types';

interface BlockedInstructorsProps {
  instructors: Instructors[];
}

const BlockedInstructors = ({ instructors }: BlockedInstructorsProps) => (
  <ul className="flex w-full min-w-[18.75rem] flex-col sm:w-5/12">
    {instructors.map(({ name, imgURL }, index) => {
      return (
        <li
          key={name + index}
          className="flex justify-between border-y border-solid border-gray-700 py-4"
        >
          <ProfileImage
            size="small"
            src={imgURL[0]}
            nickname={name}
            marginLeft={2}
          />

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
