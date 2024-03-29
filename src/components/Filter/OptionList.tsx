'use client';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import { CloseSVG } from '@/icons/svg';
import { onClickDelete } from '@/utils/searchFilterFn';

const OptionList = ({
  option,
}: {
  option: { type: string; value: string };
}) => {
  const { changeParams, searchParams, changeMultipleParams } =
    useChangeSearchParams();
  const displayValue = calculateDisplayValue(option);

  return option.type && displayValue ? (
    <li className="flex items-center text-sm font-medium">
      {displayValue}
      <button
        onClick={() =>
          onClickDelete({
            ...option,
            changeParams,
            changeMultipleParams,
            searchParams,
          })
        }
      >
        <CloseSVG
          width={14}
          height={14}
          className="ml-1 cursor-pointer stroke-sub-color1 stroke-2"
        />
      </button>
    </li>
  ) : null;
};

export default OptionList;

const calculateDisplayValue = (option: { type: string; value: string }) => {
  if (option.type === 'price') {
    const values = option.value.split(', ').map(Number);
    if (values.length < 2) {
      return '';
    } else {
      const [min, max] = values;
      if (min === 0 && max !== 0) {
        return `~ ${max.toLocaleString()}원`;
      } else if (min !== 0 && max !== 0) {
        return `${min.toLocaleString()}원 ~ ${max.toLocaleString()}원`;
      } else {
        return '';
      }
    }
  } else if (option.type === 'review') {
    return `${option.value}.0 이상`;
  } else if (option.type === 'date') {
    const values = option.value.split(', ').map((value) => value);
    const [gteDate, lteDate] = values;
    if (gteDate && lteDate) {
      return `${gteDate} ~ ${lteDate}`;
    } else {
      return gteDate;
    }
  } else {
    return option.value;
  }
};
