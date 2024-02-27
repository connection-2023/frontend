'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { IpassData } from '@/types/pass';

type LecturePassTarget = IpassData['lecturePassTarget'];

interface AppliedListProps {
  appliedList: {
    title: string;
    id: number;
  }[];
}

const AppliedList = ({ appliedList }: AppliedListProps) => {
  const [classListsView, setClassListsView] = useState(false);
  const classListRef = useRef(null);

  useClickAway(classListRef, () => {
    setClassListsView(false);
  });

  return (
    <button
      ref={classListRef}
      onClick={(event) => {
        event.stopPropagation();
        setClassListsView((prev) => !prev);
      }}
    >
      <span
        className={`relative underline underline-offset-4 group-hover:text-sub-color1 ${
          classListsView ? 'text-sub-color1' : 'text-gray-300'
        }`}
      >
        적용가능 클래스({appliedList.length})
        {classListsView && appliedList.length > 0 && (
          <div className="absolute top-5 z-10 flex min-w-[16rem] flex-col border border-solid border-gray-500 bg-white text-black">
            {appliedList.map(({ title, id }, index) => {
              return (
                <Link
                  key={id + title + String(index)}
                  href={`/class/${id}`}
                  className="border-b border-solid border-gray-500 px-4 py-2 hover:bg-sub-color1-transparent"
                >
                  {title}
                </Link>
              );
            })}
          </div>
        )}
      </span>
    </button>
  );
};

export default AppliedList;
