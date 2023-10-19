import Image from 'next/image';
import { Instructors } from '@/types/types';

interface BlockedInstructorsProps {
  instructors: Instructors[];
}

const BlockedInstructors = ({ instructors }: BlockedInstructorsProps) => (
  <ul className="flex w-5/12 min-w-[18.75rem] flex-col">
    {instructors.map(({ name, imgURL }, index) => {
      return (
        <li
          key={name + index}
          className="flex justify-between border-y border-solid border-sub-color4 py-4"
        >
          <div className="flex items-center gap-3">
            <div className="relative h-[34px] w-[34px] rounded-full">
              <Image
                src={imgURL[0]}
                fill
                alt="사용자 프로필 이미지"
                style={{ objectFit: 'cover' }}
                className="rounded-full"
              />
            </div>
            {/* Profile */}
            {name}
          </div>
          <div className="flex gap-16 text-[#414141]">
            <button>차단취소</button>
            <button>신고</button>
          </div>
        </li>
      );
    })}
  </ul>
);

export default BlockedInstructors;
