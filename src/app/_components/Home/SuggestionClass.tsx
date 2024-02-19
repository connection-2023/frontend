import { dummyMain } from '@/constants/dummy';
import { SmallLogoSVG } from '@/icons/svg';
import SuggestionPreview from '@/components/ClassPreview/SuggestionClassPreview';

const SuggestionClass = () => {
  const { suggestionClass } = dummyMain;

  return (
    <section className="absolute top-[23rem] mt-3 w-full">
      <h2 className="mb-3 flex w-full items-center gap-1 px-4 text-lg font-bold text-white sm:px-9">
        <SmallLogoSVG className="h-3 w-6" />
        AI가 추천하는 맞춤 클래스
      </h2>

      <div className="flex gap-4 overflow-x-auto px-4 sm:px-9">
        {suggestionClass.map((item) => (
          <SuggestionPreview
            key={item.title}
            title={item.title}
            range={item.range}
            review={item.review}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
};

export default SuggestionClass;
