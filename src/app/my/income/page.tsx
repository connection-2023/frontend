'use client';
import { useState } from 'react';
import AccountInfo from './_components/AccountInfo';
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
    <>
      <section className="w-full max-w-[40rem]">
        <div className="flex flex-col gap-4">
          <IncomeOverview view={view} handlePrev={handlePrev} />
          {view === 'main' ? <IncomeTable /> : <Payment />}
        </div>
      </section>

      <AccountInfo view={view} handleApply={handleApply} />
    </>
  );
};

export default IncomePage;
