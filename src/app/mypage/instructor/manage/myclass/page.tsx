'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getLecturerClassList } from '@/lib/apis/classApis';
import ClassList from './_components/ClassList';
import Spinner from '@/components/Spinner/Spinner';

const MyClassPage = () => {
  const [isProgress, setIsProgress] = useState(true);
  const status = isProgress ? '진행중' : '마감된 클래스';
  const { data, isLoading } = useQuery({
    queryKey: ['instructor', 'myclass', status],
    queryFn: () => getLecturerClassList(status),
    refetchOnWindowFocus: 'always',
  });

  const handleOptions = () => {
    setIsProgress(!isProgress);
  };

  return (
    <section className="mx-4 h-full rounded-lg bg-white p-6 shadow-float md:mx-9 xl:mx-0">
      <div className="mb-8 flex gap-[2.13rem] text-2xl text-gray-500">
        <h1
          onClick={handleOptions}
          className={`${
            isProgress
              ? 'cursor-pointer font-bold text-black'
              : 'cursor-pointer'
          }`}
        >
          모집/진행중
        </h1>
        <h1
          onClick={handleOptions}
          className={`${
            isProgress
              ? 'cursor-pointer'
              : 'cursor-pointer font-bold text-black'
          }`}
        >
          마감된 클래스
        </h1>
      </div>

      {isLoading ? (
        <div className="mb-auto mt-5 flex h-80 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {data?.map((item) => (
            <ClassList key={item.id} {...item} isProgress={isProgress} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default MyClassPage;
