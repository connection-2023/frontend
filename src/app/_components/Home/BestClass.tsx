import { searchBestClass } from '@/lib/apis/serverApis/searchApis';
import { useUserStore } from '@/store/userStore';
import { transformBestClassSearch } from '@/utils/apiDataProcessor';
import CarouselTemplate from '../CarouselTemplate';
import ClassCard from '@/components/ClassPreview/ClassPreview';

const BestClass = async () => {
  const { userType } = useUserStore.getState();
  const resBestClassList = transformBestClassSearch(
    await searchBestClass(userType === 'user'),
  );

  const bestClassList =
    resBestClassList.length < 6
      ? [
          ...resBestClassList,
          ...resBestClassList.slice(0, 6 - resBestClassList.length),
        ]
      : resBestClassList;

  return (
    <CarouselTemplate mode="class">
      {bestClassList.map((classList, index) => (
        <div
          key={classList.title + index}
          className="w-full max-w-[13rem] xl:max-w-[33.7rem]"
        >
          <ClassCard key={classList.title + index} {...classList} />
        </div>
      ))}
    </CarouselTemplate>
  );
};

export default BestClass;
