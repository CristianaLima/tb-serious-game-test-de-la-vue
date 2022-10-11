import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import {addDoc, doc, getDoc,collection, getFirestore} from "firebase/firestore";
import {useId} from "react";

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
        .then(() => {
        console.log("Document has been added successfully")

    })
        .catch(error => {
            console.log(error);
        })
}

export async function addTest(e){

    await addDoc(testsDbRef, e)
        .then(() => {
            console.log("Document has been added successfully")

        })
        .catch(error => {
            console.log(error);
        })
}

export async function addSchools(e){

    await addDoc(schoolsDbRef, e)
        .then(() => {
            console.log("Document has been added successfully")

        })
        .catch(error => {
            console.log(error);
        })
}

export async function addTherapists(e){

    await addDoc(therapistsDbRef, e)
        .then(() => {
            console.log("Document has been added successfully")

        })
        .catch(error => {
            console.log(error);
        })
}

//Update Student
export async function getStudentById(e){

    try {
        //todo : trouver une solution pour ne pas mettre en dure le path mais avoir le path de l'objet qu'on passe
        const docRef = doc(db, "students", "82vVMOkmOeUoQec6hRiC");
        //const docRef = doc(db, "students", e.id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            console.log("Document data: ", docSnap.data());
        } else {
            console.log("Document does not exist")
        }

    } catch(error) {
        console.log(error)
    }
}




