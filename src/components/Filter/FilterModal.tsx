import { useState, useEffect, useRef } from 'react';
import { ArrowUpSVG, ArrowDownSVG } from '@/icons/svg';
import { Button } from '../Button/Button';

interface IFilterModal {
  label: string;
  children: React.ReactNode;
  onReset: () => void;
  onApply: () => void;
}

const FilterModal = ({ label, children, onReset, onApply }: IFilterModal) => {
  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
      )
        setIsOpened(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const onClickLabel = () => {
    setIsOpened(!isOpened);
  };

  const onClickApply = () => {
    onApply();
    setIsOpened(false);
  };

  return (
    <div ref={ref} className="relative whitespace-nowrap text-sm">
      <button
        className="box-border flex items-center rounded-[0.625rem] border border-solid border-sub-color1 py-1 pl-3 pr-1 font-medium"
        onClick={onClickLabel}
      >
        {label}
        {isOpened ? (
          <ArrowUpSVG className="fill-sub-color1" />
        ) : (
          <ArrowDownSVG className="fill-sub-color1" />
        )}
      </button>
      {isOpened && (
        <div className="absolute z-10 mt-[0.19rem] flex w-max flex-col rounded-[5px] border border-solid border-sub-color2 bg-white">
          {children}
          <div className="box-border flex justify-between border-t border-solid border-sub-color2 px-[0.94rem] py-[0.69rem] font-bold">
            <Button mode="reset" onClick={onReset}>
              초기화
            </Button>
            <Button primary={true} size="small" onClick={onClickApply}>
              적용
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterModal;
