import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import {addDoc, doc, getDoc, collection, getFirestore, getDocs} from "firebase/firestore";
import Moment from "moment";
import {LS_NEW_STUDENTS, LS_SCHOOLS, LS_STUDENTS, LS_TESTS} from "../views/App";

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

export async function synchronise(){
    //Student
    const newStudents = JSON.parse(localStorage.getItem(LS_NEW_STUDENTS));
    const schools = JSON.parse(localStorage.getItem(LS_SCHOOLS));
    for (let i = 0; i < newStudents.length; i++) {
        // Transform idSchool value form just id to ref
        let schoolRef = schools.find((s) => {
            return s.id === newStudents[i].idSchool
        }).ref
        // Reconstruct student to delete value "localId"
        var studentFb = {
            fullName: newStudents[i].fullName,
            class: newStudents[i].class,
            dob: newStudents[i].dob,
            idSchool: schoolRef
        }
        addStudentFb(studentFb).then(
            r => {studentFb={...studentFb, id : r.id };
            console.log(studentFb)
        });

    }

    //Test
    const tests = JSON.parse(localStorage.getItem(LS_TESTS));
    for (let i = 0; i < tests.length; i++) {

    }

    // Refresh data
    getAllSchoolsFb().then(s => localStorage.setItem(LS_SCHOOLS, JSON.stringify(s)));
    getAllStudentsFb().then(s => localStorage.setItem(LS_STUDENTS, JSON.stringify(s)));
    getAllTestsFb().then(s => localStorage.setItem(LS_TESTS, JSON.stringify(s)));
    localStorage.setItem(LS_NEW_STUDENTS, JSON.stringify([]));
}

function dateConverter(timeToChange) {
    let date;
    date=(new Date(timeToChange))
    return date;
}

//Add Student
export async function addStudentFb(e){
    e.dob = dateConverter(e.dob);
    return await addDoc(studentsDbRef, e);
}

//Get all schools
export async function getAllSchoolsFb(){
    const docsSnap = await getDocs(schoolsDbRef);
    let schoolsWithRef = [];
    docsSnap.forEach(doc => {
            const schoolWithRef = {id: doc.id, data: doc.data(), ref: doc}
            schoolsWithRef.push(schoolWithRef);
        }
    );
    return schoolsWithRef;
}

//Get all students
export async function getAllStudentsFb(){
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
export async function getAllTestsFb(){
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

export async function addTestFb(e){
    e.dateTest = dateConverter(e.dateTest);
    return await addDoc(testsDbRef, e);
}

export async function getTestsByIdFb(id){
    const docRef = doc(testsDbRef, id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("Document does not exist")
        //TODO : pop-up ou page qui dit que ça n'existe pas
    }
}

export async function getStudentByIdFb(id){
        const docRef = doc(studentsDbRef, id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("Document does not exist")
            //TODO : pop-up ou page qui dit que ça n'existe pas
        }
}

export async function getSchoolByIdFb(id){
    const docRef = doc(schoolsDbRef, id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        return docSnap;
    } else {
        console.log("Document does not exist")
        //TODO : pop-up ou page qui dit que ça n'existe pas
    }
}