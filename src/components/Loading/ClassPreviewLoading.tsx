const ClassPreviewLoading = () => (
  <>
    <div className="hidden h-[13.5rem] w-full min-w-[20.5rem] rounded-lg bg-white p-3.5 shadow-horizontal xl:flex">
      <div className="mr-4 h-full w-[18.6rem] animate-pulse bg-gray-700 lg:w-full" />
      <div className="flex w-full flex-col justify-between">
        <div className="h-32 w-full animate-pulse bg-gray-700" />
        <div className="h-8 w-full animate-pulse bg-gray-700" />
      </div>
    </div>

    <div className="h-full w-full xl:hidden">
      <div className="h-48 animate-pulse rounded-lg bg-gray-700" />
      <div className="mt-3 h-14 w-full animate-pulse bg-gray-700" />
      <div className="mt-1 h-4 w-full animate-pulse bg-gray-700" />
    </div>
  </>
);

export default ClassPreviewLoading;
