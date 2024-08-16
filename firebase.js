// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaDZ9GenpLDmJvU10x5bkZto44pXXAOKE",
  authDomain: "ai-flashcard-c90e2.firebaseapp.com",
  projectId: "ai-flashcard-c90e2",
  storageBucket: "ai-flashcard-c90e2.appspot.com",
  messagingSenderId: "133791440125",
  appId: "1:133791440125:web:42f97f94af4109d9af3294",
  measurementId: "G-114KGHX8PR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default { db };
