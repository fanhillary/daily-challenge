import firebase from 'firebase'
// var firebase = require("firebase/auth");
require("firebase/auth");

var config = {
    apiKey: "AIzaSyAYSAWMfJdxW46ZTes2IRwN3kMP5WKoTy8",
    authDomain: "daily-challenge-73242.firebaseapp.com",
    databaseURL: "https://daily-challenge-73242.firebaseio.com",
    projectId: "daily-challenge-73242",
    storageBucket: "daily-challenge-73242.appspot.com",
    messagingSenderId: "1047266952950"
  };

firebase.initializeApp(config);
export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
