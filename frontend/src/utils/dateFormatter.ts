import { format } from 'date-fns';

export const dateFormatter = (date: number | string) => {
  return format(new Date(date), 'dd.MM.yyyy HH:mm');
};
