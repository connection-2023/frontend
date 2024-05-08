'use client';
import { useEffect } from 'react';
import { initFirebaseApp } from '@/utils/firebase';

const FirebaseInitializer = () => {
  useEffect(() => {
    initFirebaseApp();
  }, []);

  return null;
};

export default FirebaseInitializer;
