import { ChangeEvent, useState } from 'react';

export const useTextInput = (initialState: string, maxLength: number) => {
  const [value, setValue] = useState(initialState);
  const [length, setLength] = useState(0);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
    }
    setValue(event.target.value);
    setLength(event.target.value.length);
  };

  return { value, length, handleChange };
};
