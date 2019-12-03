import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBjm0OPcXSb-lD1YiUhaM2Tbvk5nTMwY6M",
    authDomain: "hadrian-test-5a70f.firebaseapp.com",
    databaseURL: "https://hadrian-test-5a70f.firebaseio.com",
    projectId: "hadrian-test-5a70f",
    storageBucket: "hadrian-test-5a70f.appspot.com",
    messagingSenderId: "87929167428",
    appId: "1:87929167428:web:de5810ce14a1be84766611"
  };

  firebase.initializeApp(firebaseConfig);


const storage = firebase.storage();

export { firebase, storage as default };