'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

const AppliedList = ({
  appliedList,
}: {
  appliedList: {
    lecture: {
      id: number;
      title: string;
    };
  }[];
}) => {
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
      <span className="relative underline underline-offset-4">
        적용가능한 클래스({appliedList.length})
        {classListsView && appliedList.length > 0 && (
          <div className="absolute top-5 z-10 flex min-w-[16rem] flex-col border border-solid border-gray-500 bg-white text-black">
            {appliedList.map(({ lecture }, index) => {
              return (
                <Link
                  key={lecture.id + lecture.title + String(index)}
                  href={`/class/${lecture.id}`}
                  className="border-b border-solid border-gray-500 px-4 py-2 hover:bg-sub-color1-transparent"
                >
                  {lecture.title}
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
