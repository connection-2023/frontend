import { UseFormReturn } from 'react-hook-form';
import { atom } from 'recoil';

export const hookForm = atom<UseFormReturn | null>({
  key: 'hookForm',
  default: null,
});
