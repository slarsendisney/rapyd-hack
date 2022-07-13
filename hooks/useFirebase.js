import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";

export default function useFirebase() {
  const config = {
    apiKey: "AIzaSyBhtkTPNSMrCiJes-FihWRILocnNThLjE0",
    authDomain: "rapyd-hack.firebaseapp.com",
    projectId: "rapyd-hack",
    storageBucket: "rapyd-hack.appspot.com",
    messagingSenderId: "214271784469",
    appId: "1:214271784469:web:2638333051c9f9603e001c",
  };
  firebase.initializeApp(config);
  return firebase;
}
