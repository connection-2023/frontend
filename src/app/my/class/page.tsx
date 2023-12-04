'use client';
import { useState, useEffect } from 'react';
import { getUserClass } from '@/lib/apis/classApis';
import ClassList from './_components/ClassList';
import Pagination from '@/components/Pagination/Pagination';
import PageSizeSelector from '@/components/Selector/PageSizeSelector';
import { IUserClassResponse } from '@/types/class';

const ClassListView = () => {
  const [isProgress, setIsProgress] = useState(true);
  const [displayCount, setDisplayCount] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsId, setItemsId] = useState({
    firstItemId: 0,
    lastItemId: 0,
  });
  const [classListData, setClassListData] = useState<IUserClassResponse[]>([]);

  useEffect(() => {
    fetchClassData(
      displayCount,
      0,
      itemsId.firstItemId,
      itemsId.lastItemId,
      isProgress,
    );
  }, []);

  const fetchClassData = async (
    displayCount: number,
    targetPage: number,
    firstItemId: number,
    lastItemId: number,
    isProgress: boolean,
  ) => {
    const option = isProgress ? '진행중' : '수강 완료';
    const classLists = await getUserClass(
      displayCount,
      currentPage,
      targetPage,
      firstItemId,
      lastItemId,
      option,
    );

    setClassListData(classLists);
    setCurrentPage(targetPage);

    setItemsId({
      firstItemId: classLists[0].id,
      lastItemId: classLists[displayCount - 1].id,
    });
  };

  const handleActiveTab = () => {
    setIsProgress((prev) => !prev);

    fetchClassData(
      displayCount,
      currentPage,
      itemsId.firstItemId,
      itemsId.lastItemId,
      !isProgress,
    );

    console.log(isProgress);
  };
  const handleDisplayCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDisplayCount = Number(event.target.value);

    setDisplayCount(newDisplayCount);

    fetchClassData(
      newDisplayCount,
      currentPage,
      itemsId.firstItemId,
      itemsId.lastItemId,
      isProgress,
    );
  };

  const handlePageChange = async ({ selected }: { selected: number }) => {
    setCurrentPage(selected);

    fetchClassData(
      displayCount,
      selected,
      itemsId.firstItemId,
      itemsId.lastItemId,
      isProgress,
    );
  };

  return (
    <section className="col-span-2 mt-3.5 h-full w-full min-w-[22rem] max-w-[40rem] flex-col rounded-lg bg-white p-6 shadow-float">
      <div className="flex gap-6 border-b border-solid pb-2 text-2xl text-gray-500">
        <h1
          onClick={handleActiveTab}
          className={`${
            isProgress
              ? 'cursor-pointer font-bold text-black'
              : 'cursor-pointer font-medium'
          }`}
        >
          진행중/예정
        </h1>
        <h1
          onClick={handleActiveTab}
          className={`${
            isProgress
              ? 'cursor-pointer font-medium'
              : 'cursor-pointer font-bold text-black'
          }`}
        >
          수강완료
        </h1>
      </div>

      <div className="mb-3.5 mt-2 flex w-full justify-end">
        <PageSizeSelector value={displayCount} onChange={handleDisplayCount} />
      </div>

      <ul className="mb-9 flex flex-col gap-4">
        {classListData.map((item) => (
          <ClassList key={item.id} {...item} isProgress={isProgress} />
        ))}
      </ul>
      <div className="w-full">
        <Pagination
          pageCount={5} // 추후 계산 필요
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default ClassListView;
