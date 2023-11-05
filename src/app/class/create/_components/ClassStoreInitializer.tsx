'use client';
import { useEffect, useRef } from 'react';
import { useClassCreateStore } from '@/store/classCreate';

const ClassStoreInitializer = ({ data }: { data: any }) => {
  const initialized = useRef(false);
  const { setClassData } = useClassCreateStore();

  if (!initialized.current) {
    setClassData(data);
    initialized.current = true;
  }

  return null;
};

export default ClassStoreInitializer;
