'use client';
import { useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import PassSelect from './PassSelect';
import UniqueButton from '@/components/Button/UniqueButton';
import { SelectPass } from '@/types/pass';

interface PassContainerProps {
  passList: SelectPass[];
}

const PassContainer = ({ passList }: PassContainerProps) => {
  const [selectPass, setSelectPass] = useState<SelectPass[]>([]);

  const changeSelectPass = (
    pass: MultiValue<SelectPass> | SingleValue<SelectPass>,
  ) => {
    if (!pass) {
      setSelectPass([]);
      return;
    }

    const newValue = Array.isArray(pass) ? pass : [pass];
    setSelectPass(newValue);
  };

  const cancelSelectedPass = () => {
    setSelectPass([]);
  };

  return (
    <div className="mt-6 flex flex-col">
      <PassSelect
        options={passList}
        onChange={changeSelectPass}
        selectValue={selectPass}
      />
      {selectPass[0] && (
        <PassCard
          passInfo={selectPass[0]}
          cancelSelectedPass={cancelSelectedPass}
        />
      )}
    </div>
  );
};

export default PassContainer;

const PassCard = ({
  passInfo,
  cancelSelectedPass,
}: {
  passInfo: SelectPass;
  cancelSelectedPass: () => void;
}) => {
  const { maxUsageCount, availableMonths, title } = passInfo.value.lecturePass;
  const { startAt, endAt } = passInfo.value;

  return (
    <dl className="relative mt-5 rounded-md text-sm shadow-horizontal">
      <div className="flex flex-col gap-1.5 p-3">
        <div className="mb-2 flex justify-between text-xl font-semibold text-main-color">
          <div className="flex w-1/2">
            <dt className="truncate">{title}</dt>
          </div>
          <div className="text-sm">
            <UniqueButton
              type="button"
              size="small"
              onClick={cancelSelectedPass}
            >
              <p className="mx-2">적용취소</p>
            </UniqueButton>
          </div>
        </div>
        <dd className="truncate">남은 횟수: {maxUsageCount}회</dd>
        {startAt && endAt ? <dd>{startAt + '-' + endAt}</dd> : <dd>미사용</dd>}
        <dd>이용기간: {availableMonths}개월</dd>
      </div>
    </dl>
  );
};
