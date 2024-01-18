import CarouselTemplate from '../../CarouselTemplate';
import ClassPreviewLoading from '@/components/Loading/ClassPreviewLoading';

const BestClassLoading = () => (
  <CarouselTemplate mode="class">
    {Array.from({ length: 5 }, (_, index) => (
      <div key={index} className="w-full max-w-[13rem] xl:max-w-[33.7rem]">
        <ClassPreviewLoading />
      </div>
    ))}
  </CarouselTemplate>
);

export default BestClassLoading;
