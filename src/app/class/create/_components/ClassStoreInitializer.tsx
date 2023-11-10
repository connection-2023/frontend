'use client';
import { useRef } from 'react';
import { useClassCreateStore } from '@/store/classCreate';
import { IGetClassDraft } from '@/types/class';

const ClassStoreInitializer = ({ data }: { data: IGetClassDraft }) => {
  const initialized = useRef(false);
  const { setClassData } = useClassCreateStore();

  if (!initialized.current) {
    setClassData(data);
    initialized.current = true;
  }

  return null;
};

export default ClassStoreInitializer;
