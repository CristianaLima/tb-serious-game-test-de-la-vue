import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import {addDoc,collection, getFirestore} from "firebase/firestore"; // Firestore

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firestore = getFirestore();
const studentRef =  firestore.collection('students');

//Add Student
export async function addStudentFirebase(e){
    //TODO: for Océane
    //await addDoc(collection(firestore, "students"), e);

    studentRef
        .doc()
        .set(e)
        .catch((err) => {
            console.error(err);
        });
}




