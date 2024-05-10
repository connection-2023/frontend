'use client';
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { getToken } from 'firebase/messaging';
import { useEffect } from 'react';

const FirebaseInitializer = () => {
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

  useEffect(() => {
    const messaging = initFirebaseApp();

    getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log(currentToken);
          alert('토큰: ' + currentToken);
          // 토큰을 서버에 전달...
        } else {
          // Show permission request UI
          console.log(
            'No registration token available. Request permission to generate one.',
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
  }, []);

  return null;
};

export default FirebaseInitializer;
