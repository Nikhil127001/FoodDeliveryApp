import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDUjCpxypJPd2c9RRoYCPAB84ZXhevkYko",
  authDomain: "fillirestroadminpanel.firebaseapp.com",
  projectId: "fillirestroadminpanel",
  storageBucket: "fillirestroadminpanel.appspot.com",
  messagingSenderId: "826282838429",
  appId: "1:826282838429:web:d1ff79e3f677eff2cc4774",
  measurementId: "G-XWYERK321H"
};

if ( !firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export{firebase}