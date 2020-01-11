import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAxQ_HM8SvcuUEufKlLKbkAgovx5XP1XNQ",
    authDomain: "easyremote-492b9.firebaseapp.com",
    databaseURL: "https://easyremote-492b9.firebaseio.com",
    projectId: "easyremote-492b9",
    storageBucket: "easyremote-492b9.appspot.com",
    messagingSenderId: "1015367880070",
    appId: "1:1015367880070:web:050342332f818fe131f007",
    measurementId: "G-X5V3CYGF8E"
  };
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebase.firestore()