import { format } from 'date-fns';

export const formatClassTime = (startDateTime: string, endDateTime: string) => {
  const formattedStartDate = format(new Date(startDateTime), 'yy/MM/dd HH:mm');
  const formattedEndDate = format(new Date(endDateTime), 'HH:mm');

  // ex. 24/01/18 22:50-10:50
  return `${formattedStartDate}-${formattedEndDate}`;
};
