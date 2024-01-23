import { cookies } from 'next/headers';
import { searchBestClass } from '@/lib/apis/serverApis/searchApis';
import { transformBestClassSearch } from '@/utils/apiDataProcessor';
import CarouselTemplate from '../CarouselTemplate';
import ClassCard from '@/components/ClassPreview/ClassPreview';

const BestClass = async () => {
  const cookieStore = cookies();
  const isUser =
    cookieStore.get('userAccessToken')?.value !== undefined ? true : false;
  const bestClassList = transformBestClassSearch(await searchBestClass(isUser));

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
