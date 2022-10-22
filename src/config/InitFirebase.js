import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import {addDoc, doc, getDoc, collection, getFirestore, getDocs} from "firebase/firestore";
import Moment from "moment";

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
const therapistDbRef = collection(db, "therapists")
const schoolsDbRef = collection(db, "schools")
const testsDbRef = collection(db, "tests")

function dateConverter(timeToChange) {
    let date;
    date=(new Date(timeToChange))
    return date;
}

//Add Student
export async function addStudent(e){
    e.dob = dateConverter(e.dob);
    return await addDoc(studentsDbRef, e);
    //TODO: error handling
}

//Get all schools
export async function getAllSchools(){
        const docsSnap = await getDocs(schoolsDbRef);
        let schools = [];
        docsSnap.forEach(doc => {
                const school = { data: doc.data(), id: doc.id}
                schools.push(school);
            }
        );
        return schools;
    //TODO: error handling
}

//Get all students
export async function getAllStudents(){
    const docsSnap = await getDocs(studentsDbRef);
    let students = [];
    docsSnap.forEach(doc => {
            const student = doc.data();
            Moment.locale('en'); //TODO: link to quentin code
            const dob = student.dob.toDate();
            const studentDate = {
                fullName: student.fullName,
                dob: Moment(dob).format('d MMMM yyyy'),
                class: student.class
                };
            const studentWithId = { data: studentDate, id: doc.id}
            students.push(studentWithId);
        }
    );
    return students;
    //TODO: error handling
}

//Get all tests
export async function getAllTests(){
    const docsSnap = await getDocs(testsDbRef);
    let tests = [];
    docsSnap.forEach(doc => {
            const testWithId = {data: doc.data(), id: doc.id};
            tests.push(testWithId);
        }
    );
    return tests;
    //TODO: error handling
}

export async function addTest(e){
    e.dateTest = dateConverter(e.dateTest);
    return await addDoc(testsDbRef, e);
    //TODO: error handlling
}

export async function getTestsById(id){
    const docRef = doc(testsDbRef, id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        return {data: docSnap.data(), id: docSnap.id};
    } else {
        console.log("Document does not exist")
        //TODO : pop-up ou page qui dit que ça n'existe pas
    }
}

export async function getStudentById(id){
        const docRef = doc(studentsDbRef, id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            return {data: docSnap.data(), id: docSnap.id};
        } else {
            console.log("Document does not exist")
            //TODO : pop-up ou page qui dit que ça n'existe pas
        }
}

export async function getTherapistById(id){
    const docRef = doc(therapistDbRef, id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        return {data: docSnap.data(), id: docSnap.id};
    } else {
        console.log("Document does not exist")
        //TODO : pop-up ou page qui dit que ça n'existe pas
    }
}

export async function getSchoolById(id){
    const docRef = doc(schoolsDbRef, id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        return {data: docSnap.data(), id: docSnap.id};
    } else {
        console.log("Document does not exist")
        //TODO : pop-up ou page qui dit que ça n'existe pas
    }
}