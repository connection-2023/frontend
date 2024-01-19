import ClassPreviewLoading from '@/components/Loading/ClassPreviewLoading';

const RecentClassLoading = () => (
  <div className="grid auto-cols-auto grid-cols-1 justify-items-center gap-x-4 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 xl:gap-y-4">
    {Array.from({ length: 8 }, (_, index) => (
      <div key={index} className="w-full flex-shrink flex-grow">
        <ClassPreviewLoading />
      </div>
    ))}
  </div>
);

export default RecentClassLoading;
