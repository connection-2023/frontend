'use client';
import { useState, useEffect, useRef } from 'react';
import { ArrowUpSVG, ArrowDownSVG } from '../../../public/icons/svg';
import { Button } from '../Button/Button';

interface FilterBtnProps {
  label: '지역' | '장르' | '평점' | '가격' | '지정날짜' | '진행방식' | '시간';
  content: React.JSX.Element;
}

const FilterBtn = ({ label, content }: FilterBtnProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onClickLabel = () => {
    setIsOpened(!isOpened);
  };

  const onClickApply = () => {
    setIsOpened(false);
  };

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

  return (
    <div className="relative" ref={ref}>
      <button
        className="box-border flex items-center rounded-[0.625rem] border border-solid border-sub-color1 px-4 py-3 "
        onClick={onClickLabel}
      >
        {label} {isOpened ? <ArrowUpSVG /> : <ArrowDownSVG />}
      </button>
      {isOpened && (
        <div className="absolute z-10 mt-[0.19rem] flex w-max flex-col rounded-[5px] border border-solid border-[#B6B6B6] bg-white">
          {content}

          <div className="box-border flex justify-between border-t border-solid border-[#B6B6B6] px-[0.94rem] py-[0.69rem]">
            <Button mode="reset" label="초기화" onClick={() => {}} />
            <Button
              primary={true}
              size="small"
              label="적용"
              onClick={onClickApply}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBtn;
