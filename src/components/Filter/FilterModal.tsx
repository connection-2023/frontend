import { useState, useEffect, useRef } from 'react';
import { useClickAway } from 'react-use';
import { ArrowUpSVG, ArrowDownSVG } from '@/icons/svg';
import { usefilterPositionnStore } from '@/store/filterPositionnStore';
import { useScrollStore } from '@/store/scrollStore';
import Button from '../Button/Button';
import ResetButton from '../Button/ResetButton';

interface IFilterModal {
  label: string;
  children: React.ReactNode;
  onReset: () => void;
  onApply: () => void;
  onClose: () => void;
}

const FilterModal = ({
  label,
  children,
  onReset,
  onApply,
  onClose,
}: IFilterModal) => {
  const { isScrolling } = usefilterPositionnStore();
  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonPos, setButtonPos] = useState<{
    top: number | null;
    left: number | null;
  }>({ top: null, left: null });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setIsOpened(false);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isScrolling]);

  useClickAway(ref, () => {
    setIsOpened(false);
    if (onClose) {
      onClose();
    }
  });

  const onClickLabel = () => {
    setIsOpened(!isOpened);

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      setButtonPos({
        top: rect.top + rect.height,
        left: rect.left,
      });
    }
  };

  const onClickApply = () => {
    onApply();
    setIsOpened(false);
  };

  return (
    <div ref={ref} className="whitespace-nowrap text-sm">
      <button
        ref={buttonRef}
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
        <div
          className="fixed z-modal mt-[0.19rem] flex w-max flex-col rounded-[5px] border border-solid border-gray-500 bg-white"
          style={{ top: `${buttonPos.top}px`, left: `${buttonPos.left}px` }}
          data-no-drag
        >
          {children}
          <div className="box-border flex justify-between border-t border-solid border-gray-500 px-[0.94rem] py-[0.69rem] font-bold">
            <ResetButton onClick={onReset}>초기화</ResetButton>
            <div className="w-14">
              <Button color="primary" size="small" onClick={onClickApply}>
                적용
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterModal;
