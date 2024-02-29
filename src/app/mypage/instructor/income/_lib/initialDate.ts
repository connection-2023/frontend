import { subMonths } from 'date-fns';
import { formatDateWithHyphens } from '@/utils/dateTimeUtils';

const calculateInitialDate = () => {
  const today = new Date();
  const initialToDate = today;
  const initialFromDate = subMonths(today, 1);

  return {
    from: initialFromDate,
    to: initialToDate,
  };
};

export const initialDateString = () => {
  const { from, to } = calculateInitialDate();

  return {
    from: formatDateWithHyphens(from),
    to: formatDateWithHyphens(to),
  };
};

export const initialDateObject = calculateInitialDate;
