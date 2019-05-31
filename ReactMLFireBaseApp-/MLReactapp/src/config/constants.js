import firebase from 'firebase';



//config details from firebase app
const config = {
     apiKey: "AIzaSyBLQ87DFt-A8806SBpqqrMru8z4PXoLHRA",
    authDomain: "mlproject-a59a6.firebaseapp.com",
    databaseURL: "https://mlproject-a59a6.firebaseio.com",
    projectId: "mlproject-a59a6",
    storageBucket: "mlproject-a59a6.appspot.com",
    messagingSenderId: "909157966048"
  };

firebase.initializeApp(config);
//Google Auth provider from firebase that will allow us to log in via Google. And lastly set up Firebase database
//append to the firestore setup which saves create_at timestamps as a firestore timestamp instead of a regular date object.
export const googleProvider = new
firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth;
export const db = firebase.firestore().settings({
timestampsInSnapshots: true });
