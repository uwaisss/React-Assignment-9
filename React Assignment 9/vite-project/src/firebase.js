import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  query
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAjZn_WzCRMfUwCR6L-7bwHsch_ZNq8ljA",
  authDomain: "todo-auth-c9313.firebaseapp.com",
  projectId: "todo-auth-c9313",
  storageBucket: "todo-auth-c9313.firebasestorage.app",
  messagingSenderId: "525066577319",
  appId: "1:525066577319:web:ccf3ba93469f44d7334282"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  query
};
