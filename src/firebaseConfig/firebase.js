import firebase from "firebase"
var firebaseConfig = {
  apiKey: "AIzaSyCmRT9at2wnC3KTcDd55ItEcPowa0RnRio",
  authDomain: "guru-nanak-school-lms.firebaseapp.com",
  databaseURL: "https://guru-nanak-school-lms.firebaseio.com",
  projectId: "guru-nanak-school-lms",
  storageBucket: "guru-nanak-school-lms.appspot.com",
  messagingSenderId: "672320003037",
  appId: "1:672320003037:web:9701486d737d426ce67434",
};
firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();
export const myStorage = firebase.storage();
export const classInfo = databaseRef.child("ClassInfo");
export const firebasAuth = firebase.auth();
export const realTimeDB = firebase.database();