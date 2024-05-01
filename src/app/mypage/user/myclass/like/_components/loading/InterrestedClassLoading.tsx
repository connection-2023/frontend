import ClassPreviewLoading from '@/components/Loading/ClassPreviewLoading';

const InterrestedClassLoading = () => {
  return (
    <div className="col-span-1 mx-auto flex w-full flex-col p-4 sm:w-[644px] xl:mx-0">
      <div className="mb-6 h-7 animate-pulse bg-gray-700" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="w-full max-w-[13rem] xl:max-w-[33.7rem]">
            <ClassPreviewLoading />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterrestedClassLoading;
