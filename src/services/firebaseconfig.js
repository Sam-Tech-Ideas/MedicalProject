// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAygio7gVXQoHVJujtbbmLHu6wx5zaY4VY',
  authDomain: 'medical-75ae7.firebaseapp.com',
  projectId: 'medical-75ae7',
  storageBucket: 'medical-75ae7.appspot.com',
  messagingSenderId: '801283588951',
  appId: '1:801283588951:web:d7bcd8a3ff129a70df3412',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

 export default app;
