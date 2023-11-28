import { useState } from 'react';
import { dummyClassList } from '@/constants/dummy';
import ClassList from './ClassList';

const ClassListView = ({ onItemClick }: { onItemClick: () => void }) => {
  const [activeTab, setActiveTab] = useState('progress');

  return (
    <section className="col-span-2 mt-3.5 h-full w-full min-w-[22rem] flex-col rounded-lg bg-white p-6 shadow-float">
      <div className="mb-[1.3rem] flex gap-6 text-2xl text-gray-500">
        <h1
          onClick={() => setActiveTab('progress')}
          className={`${
            activeTab === 'progress'
              ? 'cursor-pointer font-bold text-black'
              : 'cursor-pointer font-medium'
          }`}
        >
          진행중/예정
        </h1>
        <h1
          onClick={() => setActiveTab('closed')}
          className={`${
            activeTab === 'closed'
              ? 'cursor-pointer font-bold text-black'
              : 'cursor-pointer font-medium'
          }`}
        >
          수강완료
        </h1>
      </div>
      <ul className="flex flex-col gap-4">
        {dummyClassList.map((item) => (
          <ClassList
            key={item.id}
            activeTab={activeTab}
            title={item.title}
            onItemClick={onItemClick}
          />
        ))}
      </ul>
    </section>
  );
};

export default ClassListView;
