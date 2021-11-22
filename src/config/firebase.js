import firebase from "firebase";
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyBiBhNAy6HYqCLCMR1vhB1LiJocBnMOWlI",
    authDomain: "js2-2c76c.firebaseapp.com",
    projectId: "js2-2c76c",
    storageBucket: "js2-2c76c.appspot.com",
    messagingSenderId: "896759969306",
    appId: "1:896759969306:web:5a0dedfc44ad66c8e103a3"
};

// Initialize Firebase
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};