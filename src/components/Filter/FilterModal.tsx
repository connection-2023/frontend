import { useState, useEffect, useRef } from 'react';
import { useClickAway } from 'react-use';
import { ArrowUpSVG, ArrowDownSVG } from '@/icons/svg';
import Button from '../Button/Button';
import ResetButton from '../Button/ResetButton';

interface IFilterModal {
  label: string;
  children: React.ReactNode;
  onReset: () => void;
  onApply: () => void;
  onClose?: () => void;
}

const FilterModal = ({
  label,
  children,
  onReset,
  onApply,
  onClose,
}: IFilterModal) => {
  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, () => {
    setIsOpened(false);
    if (onClose) {
      onClose();
    }
  });

  const onClickLabel = () => {
    setIsOpened(!isOpened);
  };

  const onClickApply = () => {
    onApply();
    setIsOpened(false);
  };

  return (
    <div ref={ref} className="relative z-modal whitespace-nowrap text-sm">
      <button
        className="box-border flex items-center rounded-[0.625rem] border border-solid border-sub-color1 py-1 pl-3 pr-1 font-medium"
        onClick={onClickLabel}
      >
        {label}
        {isOpened ? (
          <ArrowUpSVG className="h-[34px] w-[34px] fill-sub-color1" />
        ) : (
          <ArrowDownSVG className="h-[34px] w-[34px] fill-sub-color1" />
        )}
      </button>
      {isOpened && (
        <div className="absolute z-10 mt-[0.19rem] flex w-max flex-col rounded-[5px] border border-solid border-gray-500 bg-white">
          {children}
          <div className="box-border flex justify-between border-t border-solid border-gray-500 px-[0.94rem] py-[0.69rem] font-bold">
            <ResetButton onClick={onReset}>초기화</ResetButton>
            <Button color="primary" size="small" onClick={onClickApply}>
              적용
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterModal;
