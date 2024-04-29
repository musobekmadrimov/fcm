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
    apiKey: "AIzaSyBBed8r91sLX41rtN_eV0_oboi6NyrDSAA",
    authDomain: "portfolio-website-javohir.firebaseapp.com",
    projectId: "portfolio-website-javohir",
    storageBucket: "portfolio-website-javohir.appspot.com",
    messagingSenderId: "762678608362",
    appId: "1:762678608362:web:348b7f4d324af6130b3293",
    measurementId: "G-DZK0FFKFBT"
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