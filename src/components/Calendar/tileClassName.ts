export const tileClassName = ({
  date,
  selectedDates,
}: {
  date: Date;
  selectedDates: Date[];
}) => {
  const isContinuous = (current: Date, next: Date) => {
    return Math.abs(current.getTime() - next.getTime()) === 24 * 60 * 60 * 1000;
  };

  for (let i = 0; i < selectedDates.length; i++) {
    if (selectedDates[i].getTime() === date.getTime()) {
      const prevDate = selectedDates[i - 1];
      const nextDate = selectedDates[i + 1];

      const isPrevContinuous = prevDate && isContinuous(prevDate, date);
      const isNextContinuous = nextDate && isContinuous(date, nextDate);

      if (isPrevContinuous && !isNextContinuous) {
        return 'selected-continuous-last';
      } else if (!isPrevContinuous && isNextContinuous) {
        return 'selected-continuous-first';
      } else if (isPrevContinuous || isNextContinuous) {
        return 'selected-continuous';
      }

      return 'selected';
    }
  }

  return null;
};
