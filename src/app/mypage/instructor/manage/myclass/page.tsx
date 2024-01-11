'use client';
import { useEffect, useState } from 'react';
import { getLecturerClassList } from '@/lib/apis/classApis';
import ClassList from './_components/ClassList';
import { ILecturerClassListResonse } from '@/types/class';

const MyClassPage = () => {
  const [isProgress, setIsProgress] = useState(true);
  const [classListData, setClassListData] = useState<
    ILecturerClassListResonse[]
  >([]);

  useEffect(() => {
    fetchClassListData();
  }, []);

  const handleOptions = () => {
    setIsProgress(!isProgress);
  };

  const fetchClassListData = async () => {
    const option = isProgress ? '진행중' : '마감된 클래스';
    const classData = await getLecturerClassList(option);
    if (classData instanceof Error) return;

    setClassListData(classData);
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
      <ul className="flex flex-col gap-4">
        {classListData.map((item) => (
          <ClassList key={item.id} {...item} isProgress={isProgress} />
        ))}
      </ul>
    </section>
  );
};

export default MyClassPage;
