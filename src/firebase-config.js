import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRcQSn_zEkBnV8sTVU_uwHt7lihp4eSxY",
  authDomain: "react-crud-c0773.firebaseapp.com",
  projectId: "react-crud-c0773",
  storageBucket: "react-crud-c0773.appspot.com",
  messagingSenderId: "994656345806",
  appId: "1:994656345806:web:0bc7ed98e399ab5a3eba9f",
  measurementId: "G-BV1KSD8NJZ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);