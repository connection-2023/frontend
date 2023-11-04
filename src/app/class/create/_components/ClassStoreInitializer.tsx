'use client';
import { useRef } from 'react';
import { useClassCreateStore } from '@/store/classCreate';

const ClassStoreInitializer = ({ data }: { data: any }) => {
  const initialized = useRef(false);
  const setClassData = useClassCreateStore((state) => state.setClassData);

  if (!initialized.current) {
    setClassData(data);
    initialized.current = true;
  }

  return null;
};

export default ClassStoreInitializer;
