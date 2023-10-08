'use client';
import { useState } from 'react';
import ClassDetailView from './_components/ClassDetailView';
import ClassListView from './_components/ClassListView';

const MyClassPage = () => {
  const [activeView, setActiveView] = useState('list');

  const handleItemClick = () => {
    setActiveView('detail');
  };

  const handleGoBack = () => {
    setActiveView('list');
  };

  return (
    <main className="mx-auto flex w-full flex-col p-4">
      {activeView === 'list' ? (
        <ClassListView onItemClick={handleItemClick} />
      ) : (
        <ClassDetailView onGoBack={handleGoBack} />
      )}
    </main>
  );
};

export default MyClassPage;
