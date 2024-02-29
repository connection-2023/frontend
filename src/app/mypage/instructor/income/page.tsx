'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import IncomeDataViewerLoading from './_components/Loading/IncomeDataViewerLoading';
import IncomeOverviewLoading from './_components/Loading/IncomeOverviewLoading';

const IncomeOverview = dynamic(() => import('./_components/IncomeOverview'), {
  ssr: false,
  loading: () => <IncomeOverviewLoading />,
});

const IncomeDataViewer = dynamic(
  () => import('./_components/IncomeDataViewer'),
  {
    ssr: false,
    loading: () => <IncomeDataViewerLoading />,
  },
);

const Payment = dynamic(() => import('./_components/Payment'), {
  ssr: false,
});

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
      {view === 'main' ? <IncomeDataViewer /> : <Payment />}
    </div>
  );
};

export default IncomePage;
