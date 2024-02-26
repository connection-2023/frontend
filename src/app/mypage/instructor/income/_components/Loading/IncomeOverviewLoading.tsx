const IncomeOverviewLoading = () => (
  <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[2fr,1fr]">
    <div className="h-[280px] w-full animate-pulse rounded-lg bg-gray-700 shadow-float" />

    <div className="grid w-full grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-1">
      <section className="h-[140px] animate-pulse rounded-lg bg-gray-700 shadow-float" />

      <section className="h-32 w-full animate-pulse rounded-lg bg-gray-700 shadow-float shadow-float md:h-[140px] lg:h-32" />
    </div>
  </div>
);

export default IncomeOverviewLoading;
