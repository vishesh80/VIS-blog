import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDkQITT5_XBMKUyXH2KbOTMhDnPU5zufv8",
  authDomain: "visblog.firebaseapp.com",
  databaseURL: "https://visblog.firebaseio.com",
  projectId: "visblog",
  storageBucket: "visblog.appspot.com",
  messagingSenderId: "392620600559",
  appId: "1:392620600559:web:9e99bce6037e2475663f1a",
};

firebase.initializeApp(firebaseConfig);

let auth = firebase.auth();
let googleauthProvider = new firebase.auth.GoogleAuthProvider();

export {auth, googleauthProvider};