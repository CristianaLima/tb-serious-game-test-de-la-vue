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
}

//Get all schools
export async function getAllSchools(){
    const docsSnap = await getDocs(schoolsDbRef);
    let schools = [];
    docsSnap.forEach(doc => {
            const school = doc.data();
            const schoolWithId = {...school, id: doc.id}
            schools.push(schoolWithId);
        }
    );
    return schools;
}

//Get all students
export async function getAllStudents(){
    const docsSnap = await getDocs(studentsDbRef);
    let students = [];
    docsSnap.forEach(doc => {
            const student = doc.data();
            Moment.locale('en'); //TODO: link to quentin code
            const dob = student.dob.toDate();
            const schoolWithId = {
                id: doc.id,
                fullName: student.fullName,
                dob: Moment(dob).format('d MMMM yyyy'),
                class: student.class
                };
            students.push(schoolWithId);
        }
    );
    return students;
}

//Get all tests
export async function getAllTests(){
    const docsSnap = await getDocs(testsDbRef);
    let tests = [];
    docsSnap.forEach(doc => {
            const test = doc.data();
            const testWithId = {...test, id: doc.id};
            tests.push(testWithId);
        }
    );
    return tests;
}

export async function addTest(e){
    e.dateTest = dateConverter(e.dateTest);
    return await addDoc(testsDbRef, e);
}

export async function getTestsById(id){
    const docRef = doc(testsDbRef, id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("Document does not exist")
        //TODO : pop-up ou page qui dit que ça n'existe pas
    }
}

export async function getStudentById(id){
        const docRef = doc(studentsDbRef, id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("Document does not exist")
            //TODO : pop-up ou page qui dit que ça n'existe pas
        }
}

export async function getSchoolById(id){
    const docRef = doc(schoolsDbRef, id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        return docSnap;
    } else {
        console.log("Document does not exist")
        //TODO : pop-up ou page qui dit que ça n'existe pas
    }
}