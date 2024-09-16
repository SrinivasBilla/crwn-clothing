import { initializeApp } from "firebase/app";
import { 
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBfnXdzyzIm-_qccyokrQuclyB4v-q45_c",
  authDomain: "crwn-clothing-db-30af1.firebaseapp.com",
  projectId: "crwn-clothing-db-30af1",
  storageBucket: "crwn-clothing-db-30af1.appspot.com",
  messagingSenderId: "710559254003",
  appId: "1:710559254003:web:09766e435db2a758a8be86"
};


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  promt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

const db = getFirestore();
 export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth)return;
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation 
      });
    } catch (error) {
      console.log('Error creating the user', error.massage);
      
    }
  }
  
  
 }

 export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password)return

  return await createUserWithEmailAndPassword(auth, email, password);
 }