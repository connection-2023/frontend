'use client';
import { useEffect, useState } from 'react';
import { CheckMarkSVG, PlusesSVG } from '@/icons/svg';
import Button from '@/components/Button/Button';
import MobileModal from '@/components/Modal/MobileModal';
import { SelectClassType } from '@/types/coupon';

interface SelectClassModalProps {
  onChange: (data: SelectClassType[]) => void;
  options: SelectClassType[];
  selectList: SelectClassType[];
}

const SelectClassModal = ({
  selectList,
  options,
  onChange,
}: SelectClassModalProps) => {
  const [modalView, setModalView] = useState(false);
  const [selectClassList, setSelectClassList] = useState(selectList);

  useEffect(() => {
    setSelectClassList(selectList);
  }, [selectList]);

  const closeModalHandler = () => {
    setModalView(false);
  };

  const selectClassHandler = (
    selected: boolean,
    classInfo: SelectClassType,
  ) => {
    if (selected) {
      const newSelectList = selectClassList.filter(
        ({ value }) => value !== classInfo.value,
      );
      return setSelectClassList(newSelectList);
    }
    setSelectClassList([...selectClassList, classInfo]);
  };

  const applySelectClass = () => {
    onChange(selectClassList);
    closeModalHandler();
  };

  const test = [...options, ...options, ...options];

  return (
    <>
      <button
        type="button"
        onClick={() => setModalView(true)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-solid border-gray-300 p-2"
      >
        적용할 클래스 선택하기
        <PlusesSVG className="fill-black" />
      </button>
      <MobileModal isOpened={modalView} handleClosed={closeModalHandler}>
        <section className="flex h-full flex-col gap-5 px-3">
          <strong className="text-lg">적용할 클래스를 선택해주세요.</strong>
          <ul className="flex h-1/2 flex-col gap-2 overflow-auto">
            {test.map((option, index) => {
              const { value: optionId, label } = option;
              const selected = selectClassList.some(
                ({ value }) => value === option.value,
              );

              return (
                <li key={index}>
                  <button
                    onClick={() => selectClassHandler(selected, option)}
                    className={`flex h-11 w-full items-center gap-1 rounded-md border border-solid border-black px-3 ${
                      selected ? 'bg-black text-white' : ''
                    }`}
                  >
                    {selected && (
                      <CheckMarkSVG width="20" className="fill-white" />
                    )}
                    <span className="flex-grow truncate">{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="flex gap-3">
            <Button color="secondary" onClick={closeModalHandler}>
              취소
            </Button>
            <Button onClick={applySelectClass}>적용</Button>
          </div>
        </section>
      </MobileModal>
    </>
  );
};

export default SelectClassModal;
