import { getMessaging, getToken} from "firebase/messaging";
import { initializeApp } from "firebase/app";



const firebaseConfig = {
    messagingSenderId: "480045903025",
  };

  const app = initializeApp(firebaseConfig);
  const messaging=getMessaging(app);

messaging.onBackgroundMessage((payload) => {
  console.log(
    "Received background message",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

});