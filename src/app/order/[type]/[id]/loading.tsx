const OrderLoading = () => (
  <div className="border-box mx-auto mb-20 grid w-full grid-cols-1 gap-x-12 px-4 md:px-[4.5rem] lg:grid-cols-[2fr_1fr] xl:grid-cols-[1fr_2fr_1fr]">
    <div className="hidden xl:block" />

    <div className="w-full lg:max-w-[40rem]">
      <h2 className="flex w-full items-center gap-2 border-b-[3px] border-solid border-black py-3.5">
        <p className="h-8 w-full animate-pulse bg-gray-700" />
      </h2>

      <div className="mt-4 h-80 animate-pulse rounded-md bg-gray-700 px-4 py-5 shadow-vertical" />

      <div className="mt-4 h-60 animate-pulse rounded-md bg-gray-700 px-4 py-5 shadow-vertical" />

      <div className="mt-4 h-80 animate-pulse rounded-md bg-gray-700 px-4 py-5 shadow-vertical" />
    </div>

    <aside className="mt-3.5 shadow-vertical lg:max-w-[17rem] lg:shadow-none">
      <div className="sticky top-20 mt-5 h-80 animate-pulse bg-gray-700 px-3.5 lg:mt-14 lg:px-0" />
    </aside>
  </div>
);

export default OrderLoading;
