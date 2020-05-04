import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBfaBMdWMgzgXcWG4CkgUXOGqBSROHSqUc",
  authDomain: "notes-crud-bf8a5.firebaseapp.com",
  databaseURL: "https://notes-crud-bf8a5.firebaseio.com",
  projectId: "notes-crud-bf8a5",
  storageBucket: "notes-crud-bf8a5.appspot.com",
  messagingSenderId: "511542618879",
  appId: "1:511542618879:web:83167cd9a98f36881c7aca",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore().collection("/notes");
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const fire= firebase.firestore();