'use client';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

interface ClientGuideProps {
  guide: {
    src: StaticImageData;
    text: string;
  }[];
  title: string;
  reverse?: boolean;
}

const ClientGuide = ({ guide, title, reverse }: ClientGuideProps) => {
  const [step, setStep] = useState(0);

  return (
    <>
      <div className={`hidden p-14 sm:block ${reverse ? 'col-start-2' : ''}`}>
        <Image
          src={guide[step].src}
          width={0}
          height={0}
          alt={`${title} 다운로드 가이드 이미지`}
        />
      </div>
      <div
        className={`hidden sm:block ${
          reverse ? 'col-start-1 row-start-1' : ''
        }`}
      >
        <h2 className="mb-12 text-3xl font-bold">
          <p className="text-main-color">{title}</p> 어떻게 다운로드하나요?
        </h2>
        <ul className="flex flex-col gap-5">
          {guide.map(({ text }, index) => (
            <li
              key={text}
              className={`text-lg font-bold ${
                index === step ? '' : 'text-gray-300'
              }`}
            >
              <button className="text-left" onClick={() => setStep(index)}>
                {index + 1}단계
                <p className="mt-2 text-base">{text}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ClientGuide;
