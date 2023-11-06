'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useClickAway } from 'react-use';

const ManagementButton = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useClickAway(buttonRef, () => {
    setIsOpen(false);
  });

  return (
    <button
      ref={buttonRef}
      onClick={() => setIsOpen((prev) => !prev)}
      className="relative"
    >
      {children}
      {isOpen && (
        <div className="absolute -left-[4.5rem] top-[1.4rem] inline-flex w-24 flex-col rounded-md bg-white shadow-float">
          <Link
            href="/"
            className="border-b border-solid border-gray-700  px-3 py-2 text-center hover:bg-gray-700"
          >
            신고하기
          </Link>
          <Link href="/" className="px-3 py-2 text-center hover:bg-gray-700">
            차단하기
          </Link>
        </div>
      )}
    </button>
  );
};

export default ManagementButton;
