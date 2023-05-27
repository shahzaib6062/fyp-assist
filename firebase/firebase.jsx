import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBA4tsZd8jA57HAD4dfZT5gRIe4BEoSsIU',
  authDomain: 'fyp-assist.firebaseapp.com',
  projectId: 'fyp-assist',
  storageBucket: 'fyp-assist.appspot.com',
  messagingSenderId: '1083549843930',
  appId: '1:1083549843930:web:acea091091aef1557c40e3',
  measurementId: 'G-9K0C8DSXD8',
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
