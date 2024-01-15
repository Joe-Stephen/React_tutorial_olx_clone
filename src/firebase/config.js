import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firebase';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCOqmKnp-nVguZu7HpZ-3Jy7usZxKJfThc",
    authDomain: "fir-c9f4c.firebaseapp.com",
    projectId: "fir-c9f4c",
    storageBucket: "fir-c9f4c.appspot.com",
    messagingSenderId: "828610122452",
    appId: "1:828610122452:web:c1395217c5a16db66ea141",
    measurementId: "G-VXMJP9SP12"
  };

  export default firebase.initializeApp(firebaseConfig);