/*
Give the service worker access to Firebase Messaging.
Note that you can only use Firebase Messaging here, other Firebase libraries are not available in the service worker.
*/
importScripts('https://www.gstatic.com/firebasejs/7.15.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.1/firebase-messaging.js');

/*
Initialize the Firebase app in the service worker by passing in the messagingSenderId.
* New configuration for app@pulseservice.com
*/
const firebaseConfig = {
    apiKey: "AIzaSyCLR0WhueDyk_noOSkixcgOfrqeQOrjgiU",
    authDomain: "tezpay-ru.firebaseapp.com",
    databaseURL: "https://tezpay-ru-default-rtdb.firebaseio.com",
    projectId: "tezpay-ru",
    storageBucket: "tezpay-ru.appspot.com",
    messagingSenderId: "672215398717",
    appId: "1:672215398717:web:9e7f8a6990b30004786d54",
    measurementId: "G-3H3Y6WTVMQ"
};

firebase.initializeApp(firebaseConfig);

/*
Retrieve an instance of Firebase Messaging so that it can handle background messages.
*/

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: payload.data.icon,
        image: payload.data.image,
        click_action: payload.data.click_action, // To handle notification click when notification is moved to notification tray
        data: {
            click_action: payload.data.click_action
        }
    };
    self.addEventListener('notificationclick', function(event) {
        console.log(event.notification.data.click_action);
        if (!event.action) {
            // Was a normal notification click
            console.log('Notification Click.');
            self.clients.openWindow(event.notification.data.click_action, '_blank');
            event.notification.close();
            return;
        }else{
            event.notification.close();
        }
    });
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});