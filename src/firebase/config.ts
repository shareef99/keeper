import firebase from "firebase/app";
import "firebase/firestore";

var app = {
    apiKey: "AIzaSyAlCeauan3Y4VcMNqMzpNv8dGMKdubBR4E",
    authDomain: "noteskeepers.firebaseapp.com",
    projectId: "noteskeepers",
    storageBucket: "noteskeepers.appspot.com",
    messagingSenderId: "349974173689",
    appId: "1:349974173689:web:a2bb7b75a7d91b10174f28",
    measurementId: "G-FNFGL8YH49",
};

// Initialize Firebase
firebase.initializeApp(app);

const db = firebase.firestore();

export { db };
