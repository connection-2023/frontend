import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { getUserClass } from '@/lib/apis/classApis';
import EmptyData from './EmptyData';
import Pagination from '@/components/Pagination/Pagination';
import PageSizeSelector from '@/components/Selector/PageSizeSelector';
import Spinner from '@/components/Spinner/Spinner';

const ClassList = dynamic(() => import('./ClassList'), {
  ssr: false,
  loading: () => (
    <div className="mt-4 h-48 animate-pulse rounded-md bg-gray-700 shadow-vertical" />
  ),
});

const ListView = () => {
  const [activeTab, setActiveTab] = useState<'진행중/예정' | '수강 완료'>(
    '진행중/예정',
  );
  const [displayCount, setDisplayCount] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: classListData, isLoading } = useQuery({
    queryKey: ['user', 'apply', 'list', activeTab, displayCount, currentPage],
    queryFn: () => getUserClass(activeTab, displayCount, currentPage - 1),
  });

  if (!classListData) return null;

  const { totalItemCount, enrollLectureList } = classListData;
  const pageCount =
    totalItemCount > 0 ? Math.ceil(totalItemCount / displayCount) : 0;

  const handleActiveTab = (newStatus: '진행중/예정' | '수강 완료') => {
    setActiveTab(newStatus);
  };

  const handleDisplayCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDisplayCount = Number(event.target.value);
    setDisplayCount(newDisplayCount);
  };

  const handlePageChange = async ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <ul className="flex gap-4 whitespace-nowrap text-base font-medium text-gray-300">
          {(['진행중/예정', '수강 완료'] as const).map((item) => (
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
      {/* 로딩 왜 안 보일까요... */}
      {isLoading || !classListData ? (
        <div className="mt-20 flex h-full items-center justify-center">
          <Spinner />
        </div>
      ) : totalItemCount > 0 ? (
        <>
          <ul className="mb-9 flex flex-col gap-4">
            {enrollLectureList.map((item) => (
              <ClassList key={item.id} {...item} activeTab={activeTab} />
            ))}
          </ul>

          {pageCount > displayCount && (
            <div className="w-full">
              <Pagination
                pageCount={pageCount}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        <EmptyData activeTab={activeTab} />
      )}
    </>
  );
};

export default ListView;
