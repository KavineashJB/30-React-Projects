import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABDUhRrGoGWQP3g4uIlDIobRbbtdDwHGw",
  authDomain: "notenest-8cd41.firebaseapp.com",
  projectId: "notenest-8cd41",
  storageBucket: "notenest-8cd41.firebasestorage.app",
  messagingSenderId: "670772323918",
  appId: "1:670772323918:web:cc8c32e8f36a43ca5a051f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
