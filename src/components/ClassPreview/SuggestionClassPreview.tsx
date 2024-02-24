import Image from 'next/image';
import { StarSVG } from '@/icons/svg';

interface ISuggestionProps {
  title: string;
  range: string;
  review: string;
  image: string;
}

const SuggestionClassPreview = ({
  title,
  range,
  review,
  image,
}: ISuggestionProps) => {
  return (
    <div className="flex h-[105.91px] w-[19.5rem] shrink-0 gap-[0.69rem] rounded-md bg-white p-2 shadow-horizontal">
      <Image
        width={132}
        height={97}
        style={{ objectFit: 'cover' }}
        alt="Connection AI 추천 클래스 이미지"
        src={image}
      />

      <div className="flex w-1/2 flex-col whitespace-pre-line break-keep text-sm text-gray-100">
        <p className="line-clamp-3 flex flex-1 items-start">{title}</p>
        <div className="flex items-end justify-between">
          <span>{range}</span>
          <span className="flex items-center">
            <StarSVG width={15} height={14} className="mr-1 fill-sub-color1" />
            {review}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SuggestionClassPreview;
