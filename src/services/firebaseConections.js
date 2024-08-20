import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDwPWBVS-ieuC8c1Baocf8phXbnrF0hSS4",
  authDomain: "tickets-f290a.firebaseapp.com",
  projectId: "tickets-f290a",
  storageBucket: "tickets-f290a.appspot.com",
  messagingSenderId: "162146573208",
  appId: "1:162146573208:web:f8a5be855910c9171d29ed",
  measurementId: "G-31FNJPET04"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };