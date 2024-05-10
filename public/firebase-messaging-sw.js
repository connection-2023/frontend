importScripts(
  'https://www.gstatic.com/firebasejs/9.7.0/firebase-app-compat.js',
);

importScripts('swenv.js');

importScripts(
  'https://www.gstatic.com/firebasejs/9.7.0/firebase-messaging-compat.js',
);

firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notification = payload.notification;

  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    notification,
  );

  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: '/firebase-logo.png', // 루트 경로 기준으로 접근
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
