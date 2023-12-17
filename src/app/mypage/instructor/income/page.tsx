'use client';
import { useState } from 'react';
import IncomeTable from './_components/IncomeDataViewer';
import IncomeOverview from './_components/IncomeOverview';
import Payment from './_components/Payment';

const IncomePage = () => {
  const [view, setView] = useState<'main' | 'payment'>('main');

  const handlePrev = () => {
    setView('main');
  };

  const handleApply = () => {
    setView('payment');
  };

  return (
    <div className="flex w-full flex-col gap-4 px-9 xl:px-0">
      <IncomeOverview
        view={view}
        handlePrev={handlePrev}
        handleApply={handleApply}
      />
      {view === 'main' ? <IncomeTable /> : <Payment />}
    </div>
  );
};

export default IncomePage;
