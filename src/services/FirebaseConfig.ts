import { initializeApp, FirebaseOptions } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCGDV83SJh7Mv3BBzpA6nadCrCRuJSiznc",
  authDomain: "flixnow-cc972.firebaseapp.com",
  databaseURL: "https://flixnow-cc972-default-rtdb.firebaseio.com",
  projectId: "flixnow-cc972",
  storageBucket: "flixnow-cc972.appspot.com",
  messagingSenderId: "1042899403925",
  appId: "1:1042899403925:web:1b372771e4b82c872f079c",
  measurementId: "G-NJ9R4ECPR3"
};

const app = initializeApp(firebaseConfig);

const urlAPI: string = "https://flixnow-cc972-default-rtdb.firebaseio.com/todo.json";

// Initialize Firebase
export { app, firebaseConfig, urlAPI };