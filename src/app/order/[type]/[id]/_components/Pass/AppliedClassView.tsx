'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { ArrowUpSVG } from '@/icons/svg';
import Accordion from '@/components/Accordion/Accordion';

interface AppliedClassViewProps {
  appliedClassList: {
    lecture: {
      id: number;
      title: string;
    };
  }[];
}

const AppliedClassView = ({ appliedClassList }: AppliedClassViewProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="flex items-center">
        <h3 className="font-semibold">
          적용가능 클래스 ({appliedClassList.length})
        </h3>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <ArrowUpSVG
            width="34"
            height="34"
            className={`origin-center transform fill-black duration-150 ${
              isOpen ? 'rotate-180 ' : ''
            }`}
          />
        </button>
      </div>
      <Accordion isOpen={isOpen}>
        <ul className="mt-3 flex flex-col gap-3">
          {appliedClassList.map(({ lecture }) => (
            <li key={lecture.id} className="group">
              <Link
                href={`/class/${lecture.id}`}
                className="group-hover:text-sub-color1"
              >
                {lecture.title}
              </Link>
            </li>
          ))}
        </ul>
      </Accordion>
    </>
  );
};

export default AppliedClassView;
