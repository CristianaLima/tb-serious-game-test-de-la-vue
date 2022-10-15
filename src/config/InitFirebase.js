import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import {addDoc, doc, getDoc, collection, getFirestore, query, getDocs } from "firebase/firestore";
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

//TODO: change after date management
const studentsDbRef = collection(db, "studentsTest") //collection(db, "students")

const schoolsDbRef = collection(db, "schools")
const testsDbRef = collection(db, "tests")
const therapistsDbRef = collection(db, "therapists")


//Add Student //TODO: how to catch error but return the student asked ?
export async function simpleAddStudent(e){
    return await addDoc(studentsDbRef, e);
}
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
//Get Students //TODO: only example for Oce
export async function getAllStudents(){
    //const q = query(schoolsDbRef); //TODO: for example
    const q = query(studentsDbRef);
    let students = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        //console.log(doc.ref);
        const student = doc.data();
        const studentwidthID = {...student, id: doc.id}
        students.push(studentwidthID);
    });

    return students;
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

//Get Student
export async function getStudentById(id){
    try {
        //todo : trouver une solution pour ne pas mettre en dure le path mais avoir le path de l'objet qu'on passe
        const docRef = doc(db, "students", id);
        //const docRef = doc(db, "students", "82vVMOkmOeUoQec6hRiC");
        //const docRef = doc(db, "students", e.id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            //console.log("Document data: ", docSnap.data());
            return docSnap.data();
        } else {
            console.log("Document does not exist")
        }

    } catch(error) {
        console.log(error)
    }
}




