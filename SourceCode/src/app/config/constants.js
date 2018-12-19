import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCOQrdZCL3_2YWM1d402BfmjUfQFewKwbo",
  authDomain: "math-app-1543869711050.firebaseapp.com",
  databaseURL: "https://math-app-1543869711050.firebaseio.com",
  projectId: "math-app-1543869711050",
  storageBucket: "math-app-1543869711050.appspot.com",
  messagingSenderId: "44464936686"
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
