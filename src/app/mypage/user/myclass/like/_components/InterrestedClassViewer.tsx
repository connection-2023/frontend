'use client';
import { useState } from 'react';
import ClassCard from '@/components/ClassPreview/ClassPreview';
import FineSplitIcon from '@/components/InstructorCard/FineSplitIcon';
import LargeSplitIcon from '@/components/InstructorCard/LargeSplitIcon';
import { ClassCardType } from '@/types/class';

const InterrestedClassViewer = ({
  cardDatas,
}: {
  cardDatas: ClassCardType[];
}) => {
  const [isLarge, setIsLarge] = useState(true);

  const changeCardOpption = (opption: boolean) => {
    setIsLarge(opption);
  };

  return (
    <section className="col-span-1 mx-auto flex w-full flex-col p-4 sm:w-[644px] xl:mx-0">
      <header className="mb-6 flex items-center justify-between text-2xl font-bold">
        관심 클래스({cardDatas.length})
        <div className="hidden gap-2 xl:flex">
          <LargeSplitIcon
            activated={isLarge}
            imgStateHandler={changeCardOpption}
          />
          <FineSplitIcon
            activated={!isLarge}
            imgStateHandler={changeCardOpption}
          />
        </div>
      </header>
      <ul
        className={`grid gap-3 sm:grid-cols-2 ${
          isLarge ? 'xl:grid-cols-1' : 'xl:grid-cols-2'
        }`}
      >
        {cardDatas.map((cardData) => (
          <li key={cardData.id}>
            <ClassCard {...cardData} smallView={!isLarge} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default InterrestedClassViewer;
