import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import {useRef} from "react"; // Firestore


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};
export default firebase.initializeApp(firebaseConfig);

const studentRef = firebase.firestore().collection('students')


//Add Student
export async function addStudent(e){

    studentRef
        .doc()
        .set(e)
        .catch((err) => {
            console.error(err);
        });
}




