'use client';
import { useState, useEffect } from 'react';
import { getUserClass } from '@/lib/apis/classApis';
import ClassList from './_components/ClassList';
import Pagination from '@/components/Pagination/Pagination';
import PageSizeSelector from '@/components/Selector/PageSizeSelector';
import { IUserClassResponse } from '@/types/class';

const ClassListView = () => {
  const [activeTab, setActiveTab] = useState('진행중');
  const [displayCount, setDisplayCount] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsId, setItemsId] = useState({
    firstItemId: 0,
    lastItemId: 0,
  });
  const [classListData, setClassListData] = useState<IUserClassResponse[]>([]);

  useEffect(() => {
    // fetchClassData(
    //   displayCount,
    //   0,
    //   itemsId.firstItemId,
    //   itemsId.lastItemId,
    //   activeTab,
    // );
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

    if (classLists.enrollLecture.length) {
      setClassListData(classLists.enrollLecture);
      setCurrentPage(targetPage);

      setItemsId({
        firstItemId: classLists.enrollLecture[0].id,
        lastItemId: classLists.enrollLecture[displayCount - 1].id,
      });
    } else {
      setClassListData([]);
    }
  };

  const handleActiveTab = (newStatus: string) => {
    setActiveTab(newStatus);

    // fetchClassData(
    //   displayCount,
    //   currentPage,
    //   itemsId.firstItemId,
    //   itemsId.lastItemId,
    //   !isProgress,
    // );
  };

  const handleDisplayCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDisplayCount = Number(event.target.value);

    setDisplayCount(newDisplayCount);

    // fetchClassData(
    //   newDisplayCount,
    //   currentPage,
    //   itemsId.firstItemId,
    //   itemsId.lastItemId,
    //   activeTab,
    // );
  };

  const handlePageChange = async ({ selected }: { selected: number }) => {
    setCurrentPage(selected);

    // fetchClassData(
    //   displayCount,
    //   selected,
    //   itemsId.firstItemId,
    //   itemsId.lastItemId,
    //   activeTab,
    // );
  };

  return (
    <section className="mx-auto flex w-full max-w-[40rem] flex-col bg-white px-4 py-5 text-sm text-gray-100 md:px-9 xl:mx-0 xl:px-0">
      <h1 className="mb-4 border-b border-solid border-gray-700 pb-2.5 text-2xl font-bold">
        신청한 클래스
      </h1>

      <div className="mb-4 flex w-full items-center justify-between">
        <ul className="flex gap-4 whitespace-nowrap text-base font-medium text-gray-300">
          {['진행중', '대기', '수강 완료', '취소/거절'].map((item) => (
            <li
              key={item}
              onClick={() => handleActiveTab(item)}
              className={`${
                activeTab === item
                  ? 'cursor-pointer font-bold text-black'
                  : 'cursor-pointer'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>

        <PageSizeSelector value={displayCount} onChange={handleDisplayCount} />
      </div>

      <ul className="mb-9 flex flex-col gap-4">
        {classListData.map((item) => (
          <ClassList key={item.id} {...item} activeTab={activeTab} />
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
