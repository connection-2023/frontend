'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { BasicCalendarSVG } from '@/icons/svg';
import CalendarView from './_components/CalendarView';

const ListView = dynamic(() => import('./_components/ListView'), {
  ssr: false,
});

const ClassListView = () => {
  const [activeView, setActiveView] = useState<'calendar' | 'list'>('calendar');

  const handleActiveView = (view: 'calendar' | 'list') => {
    if (activeView !== view) setActiveView(view);
  };

  const getButtonStyle = (view: 'calendar' | 'list') =>
    activeView === view
      ? 'flex items-center justify-center rounded-md border border-solid border-black bg-black h-9 gap-2 px-2 py-1 text-white font-bold'
      : 'flex items-center justify-center rounded-md border border-solid border-black bg-white h-9 gap-2 px-2 py-1 text-gray-100 font-medium';

  return (
    <section className="flex flex-col bg-white px-4 py-5 text-sm text-gray-100 md:px-9 xl:mx-0 xl:px-0">
      <div className="mb-4 flex items-center justify-between border-b border-solid border-gray-700 pb-2.5 md:justify-normal">
        <h1 className="text-2xl font-bold">신청한 클래스</h1>

        <div className="ml-4 flex gap-2 whitespace-nowrap text-base">
          <button
            onClick={() => {
              handleActiveView('calendar');
            }}
            className={getButtonStyle('calendar')}
          >
            <BasicCalendarSVG
              width="21"
              height="21"
              className={
                activeView === 'calendar' ? 'fill-white' : 'fill-gray-100'
              }
            />
            달력
          </button>

          <button
            onClick={() => {
              handleActiveView('list');
            }}
            className={getButtonStyle('list')}
          >
            <div className="flex h-6 w-6 flex-col items-center justify-between gap-0.5 p-1">
              <div
                className={`h-5 w-full border border-${
                  activeView === 'list' ? 'white' : 'black'
                } rounded-sm`}
              />
              <div
                className={`h-5 w-full border border-${
                  activeView === 'list' ? 'white' : 'black'
                } rounded-sm`}
              />
            </div>
            목록
          </button>
        </div>
      </div>

      {activeView === 'calendar' ? <CalendarView /> : <ListView />}
    </section>
  );
};

export default ClassListView;
