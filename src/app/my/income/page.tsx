'use client';
import { useState } from 'react';
import AccountInfo from './_components/AccountInfo';
import IncomeOverview from './_components/IncomeOverview';
import IncomeTable from './_components/IncomeDataViewer';
import Payment from './_components/Payment';
import { ArrowUpSVG } from '../../../../public/icons/svg';

const IncomePage = () => {
  const [view, setView] = useState<'main' | 'payment'>('main');

  const handlePrev = () => {
    setView('main');
  };

  const handleApply = () => {
    setView('payment');
  };

  return (
    <div className="mx-auto flex w-max gap-4">
      <section className="flex w-full max-w-[40rem] flex-col gap-[0.63rem]">
        <h1 className="mt-3 flex items-center text-2xl font-bold text-sub-color3">
          {view === 'payment' && (
            <button onClick={handlePrev} className="origin-center -rotate-90">
              <ArrowUpSVG fill="black" />
            </button>
          )}
          수익관리
        </h1>

        <div className="flex flex-col gap-[0.63rem]">
          <IncomeOverview view={view} handleApply={handleApply} />
          {view === 'main' ? <IncomeTable /> : <Payment />}
        </div>
      </section>

      <AccountInfo view={view} />
    </div>
  );
};

export default IncomePage;
