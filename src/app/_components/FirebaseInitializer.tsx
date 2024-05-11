'use client';
import { useQuery } from '@tanstack/react-query';
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { getToken } from 'firebase/messaging';
import {
  deleteDeviceToken,
  registerDeviceToken,
} from '@/lib/apis/notifications';
import { userType } from '@/types/auth';

interface FirebaseInitializerPorps {
  deviceToken: string | undefined;
  userType: userType;
}

const FirebaseInitializer = ({
  deviceToken,
  userType,
}: FirebaseInitializerPorps) => {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  const initFirebaseApp = () => {
    const app = initializeApp(firebaseConfig);
    return getMessaging(app);
  };

  const getDeviceToken = async () => {
    const messaging = initFirebaseApp();

    if (
      Notification.permission === 'default' ||
      (Notification.permission === 'granted' && !deviceToken)
    ) {
      return await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });
    } else if (Notification.permission === 'denied' && deviceToken) {
      await deleteDeviceToken();
    }

    return null;
  };

  const setDeviceTokenHandler = async () => {
    const deviceToken = await getDeviceToken();

    if (deviceToken) {
      await registerDeviceToken({ deviceToken });
    }

    return null;
  };

  useQuery({
    queryKey: ['deviceToken', userType],
    queryFn: setDeviceTokenHandler,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return null;
};

export default FirebaseInitializer;
