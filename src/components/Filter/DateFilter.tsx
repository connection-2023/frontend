import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import BasicCalendar from '../Calendar/BasicCalendar';
import FilterModal from './FilterModal';

interface IDateFilterProps {
  filterOption: string[];
  updateFilterOption: (label: string, option: any) => void;
}

const DateFilter = ({ filterOption, updateFilterOption }: IDateFilterProps) => {
  const [selected, setSelected] = useState<Date[]>([]);
  const label = '지정날짜';

  useEffect(() => {
    const dateVal = filterOption.map((date) => new Date(date));
    setSelected(dateVal);
  }, [filterOption]);

  const handleSelected = (value: Date[]) => {
    setSelected(value);
  };

  const onReset = () => {
    updateFilterOption(label, []);
  };

  const onApply = () => {
    const strDates = selected.map((date) => format(date, 'yyyy-MM-dd'));
    updateFilterOption(label, strDates);
  };

  return (
    <FilterModal label={label} onReset={onReset} onApply={onApply}>
      <BasicCalendar
        mode="filter"
        selectedDates={selected}
        handleSelected={handleSelected}
      />
    </FilterModal>
  );
};

export default DateFilter;
