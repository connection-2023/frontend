const ClassTopLoading = () => (
  <div className="mb-4 flex w-full flex-col items-center border-b border-solid border-gray-500 md:col-span-2 xl:col-span-3">
    {/* 이미지 */}
    <div className="mb-5 flex h-[18rem] w-full justify-center bg-gray-700 px-10" />
    {/* 제목 */}
    <div className="flex h-7 w-11/12 max-w-[40rem] animate-pulse bg-gray-700 px-4 md:justify-center" />
    {/* 리뷰 */}
    <div className="mb-4 mt-2 flex h-6 w-28 animate-pulse gap-1 bg-gray-700 px-4 md:mb-6 md:justify-center" />

    <hr className="mb-4 h-1 w-full max-w-[40rem] border-gray-700 md:mb-6" />
    {/* 클래스 정보 */}
    <div className="mb-4 h-8 w-full max-w-[40rem] animate-pulse bg-gray-700 px-4 md:mb-7" />
    {/* 쿠폰 */}
    <div className="mb-4 h-8 w-full max-w-[40rem] animate-pulse border-b border-solid border-gray-700 bg-gray-700 px-4 pb-3" />
  </div>
);

export default ClassTopLoading;
