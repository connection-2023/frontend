import { transformBestClassSearch } from '@/utils/apiDataProcessor';
import ClassPreview from '@/components/ClassPreview/ClassPreview';
import { getLatestClassLists } from '@/lib/apis/serverApis/classPostApis';

const RecentClass = async () => {
  const recentClassList = transformBestClassSearch(await getLatestClassLists());

  return (
    <div className="grid auto-cols-auto grid-cols-1 justify-items-center gap-x-4 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 xl:gap-y-4">
      {recentClassList.map((classItem, i) => (
        <div className="w-full flex-shrink flex-grow" key={i}>
          <ClassPreview {...classItem} />
        </div>
      ))}
    </div>
  );
};

export default RecentClass;
