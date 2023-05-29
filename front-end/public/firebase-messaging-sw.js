importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {  
    apiKey: "AIzaSyCgVCoyz47Bm4UrKzyhbhpl4Z7LGFuWGMA",
    authDomain: "network-bd4d1.firebaseapp.com",
    databaseURL: "https://network-bd4d1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "network-bd4d1",
    storageBucket: "network-bd4d1.appspot.com",
    messagingSenderId: "130223942524",
    appId: "1:130223942524:web:93c95021aa6121074452f9",
    measurementId: "G-BJXJC1S224"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "/logo192.png",
    };
  
    // eslint-disable-next-line no-restricted-globals
    return self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  });
