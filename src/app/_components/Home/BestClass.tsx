import { cookies } from 'next/headers';
import { searchBestClass } from '@/lib/apis/serverApis/searchApis';
import { transformBestClassSearch } from '@/utils/apiDataProcessor';
import CarouselTemplate from '../CarouselTemplate';
import ClassCard from '@/components/ClassPreview/ClassPreview';

const BestClass = async () => {
  let bestClassList: any[] = [];
  const cookieStore = cookies();
  const user = cookieStore.get('userAccessToken')?.value;

  try {
    const resBestClassList = transformBestClassSearch(
      await searchBestClass(!!user),
    );

    if (resBestClassList.length === 0) return null;

    if (resBestClassList.length < 6) {
      const repeatCount = Math.ceil(6 / resBestClassList.length);

      bestClassList = Array(repeatCount)
        .fill(resBestClassList)
        .flat()
        .slice(0, 6);
    }
  } catch (error) {
    console.error(error);
    return null;
  }

  return (
    <CarouselTemplate mode="class">
      {bestClassList.map((classList, index) => {
        const data = { ...classList, smallView: true };
        return (
          <div key={classList.title + index} className="w-full max-w-[13rem]">
            <ClassCard key={classList.title + index} {...data} />
          </div>
        );
      })}
    </CarouselTemplate>
  );
};

export default BestClass;
