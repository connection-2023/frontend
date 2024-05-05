import Image, { StaticImageData } from 'next/image';
import ClientGuide from './ClientGuide';

interface GuideProps {
  guide: {
    src: StaticImageData;
    text: string;
  }[];
  title: string;
  reverse?: boolean;
}

const Guide = (props: GuideProps) => {
  const { guide, title } = props;

  return (
    <section className="sm:grid sm:grid-cols-2">
      <ClientGuide {...props} />
      <div className="w-full px-4 sm:hidden">
        <h2 className="mb-6 text-3xl font-bold">
          <p className="text-main-color">{title}</p> 어떻게 다운로드하나요?
        </h2>
        <ul>
          {guide.map(({ text, src }, index) => (
            <li
              key={text}
              className="my-3 flex flex-col border-b border-solid border-gray-700 pb-3 text-lg font-bold"
            >
              <Image
                src={src}
                className="w-1/2 self-center"
                alt={`${title} 다운로드 가이드 이미지`}
              />
              {index + 1}단계
              <p className="mt-2 text-base">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Guide;
