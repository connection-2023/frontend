const Loading = () => (
  <div className="border-box mx-auto mt-[1.38rem] box-border grid grid-cols-1 gap-x-12 px-4 md:grid-cols-[1fr_3fr] md:gap-x-5 xl:grid-cols-[1fr_2fr_1fr] xl:px-0">
    <div className="mb-4 h-[475px] w-full animate-pulse border-b border-solid border-gray-500 bg-gray-700 md:col-span-2 xl:col-span-3" />
    <div className="sticky top-0 hidden h-80 w-1/2 animate-pulse justify-self-center bg-gray-700 pt-16 md:block" />
    <div className="h-screen w-full animate-pulse bg-gray-700" />
    <div />
  </div>
);

export default Loading;
