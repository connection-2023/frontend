import { useState } from 'react';
import { ArrowDownSVG, ArrowUpSVG } from '@/icons/svg';
import { usefilterStore } from '@/store/filterStore';
import Accordion from '../Accordion/Accordion';
import ResetButton from '../Button/ResetButton';
import { Regions } from '@/types/instructor';

interface FilterAccordionProps {
  filterList: any; // Regions;
  label: string;
  children: React.ReactNode;
  onReset: () => void;
}

const FilterAccordion = ({
  children,
  label,
  filterList,
  onReset,
}: FilterAccordionProps) => {
  const { openFilterLabel, setOpenFilterLabel } = usefilterStore();
  const isOpened = openFilterLabel === label;

  const accordionOpenHandler = () => {
    if (openFilterLabel === label) {
      return setOpenFilterLabel(null);
    }
    return setOpenFilterLabel(label);
  };

  console.log(filterList);

  return (
    <div className="flex flex-col whitespace-nowrap">
      <div className="flex h-[4.8rem] items-center justify-between">
        <div className="flex items-center">
          <p className="text-lg font-semibold">{label}</p>
          <button onClick={accordionOpenHandler}>
            {isOpened ? (
              <ArrowUpSVG className="h-[34px] w-[34px] fill-black" />
            ) : (
              <ArrowDownSVG className="h-[34px] w-[34px] fill-black" />
            )}
          </button>
        </div>
        {isOpened ? (
          <ResetButton onClick={onReset}>초기화</ResetButton>
        ) : (
          <div className="flex-grow truncate text-right text-gray-300">a</div>
        )}
      </div>
      <Accordion isOpen={isOpened}>{children}</Accordion>
    </div>
  );
};

export default FilterAccordion;
