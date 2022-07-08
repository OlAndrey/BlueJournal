import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCgVCoyz47Bm4UrKzyhbhpl4Z7LGFuWGMA",
    authDomain: "network-bd4d1.firebaseapp.com",
    projectId: "network-bd4d1",
    storageBucket: "network-bd4d1.appspot.com",
    messagingSenderId: "130223942524",
    appId: "1:130223942524:web:93c95021aa6121074452f9",
    measurementId: "G-BJXJC1S224"
};

// initialize our app
const firebaseApp = firebase.initializeApp(firebaseConfig);

// initial database
const firestore = firebaseApp.firestore()
const database = firebaseApp.database();
/*.settings({
    experimentalForceLongPolling: true, // this line
    useFetchStreams: true, // and this line
  });*/



// set auth
const auth = firebase.auth();

// set provider
//const provider = new firebase.auth.GoogleAuthProvider();

export { database, firebaseApp };
export default firestore;
