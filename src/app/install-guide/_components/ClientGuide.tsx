'use client';
import { motion } from 'framer-motion';
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

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <motion.div
        key={step}
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        className={`hidden p-14 sm:block ${reverse ? 'col-start-2' : ''}`}
      >
        <Image
          src={guide[step].src}
          width={0}
          height={0}
          alt={`${title} 다운로드 가이드 이미지`}
        />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        className={`hidden sm:block ${
          reverse ? 'col-start-1 row-start-1' : ''
        }`}
      >
        <h2 className="mb-12 text-3xl font-bold">
          <p className="text-main-color">{title}</p> 어떻게 다운로드하나요?
        </h2>
        <ul className="flex flex-col gap-5">
          {guide.map(({ text }, index) => (
            <motion.li
              key={text}
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`text-lg font-bold ${
                index === step ? '' : 'text-gray-300'
              }`}
            >
              <button className="text-left" onClick={() => setStep(index)}>
                {index + 1}단계
                <p className="mt-2 text-base">{text}</p>
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default ClientGuide;
