import { useEffect, useRef } from 'react';

const usePreviousValue = <T>(value: T): T | undefined => {
  const previousValueRef = useRef<T>();

  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);

  return previousValueRef.current;
};

export default usePreviousValue;
