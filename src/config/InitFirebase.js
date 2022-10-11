import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import {addDoc,collection, getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firestore = getFirestore();

const db = getFirestore(firebaseApp);
const studentsDbRef = collection(db, "students")
const schoolsDbRef = collection(db, "schools")
const testsDbRef = collection(db, "tests")
const therapistsDbRef = collection(db, "therapists")

//Add Student
export async function addStudent(e){

    await addDoc(studentsDbRef, e)
        .then(docRef => {
        console.log("Document has been added successfully")

    })
        .catch(error => {
            console.log(error);
        })
}





