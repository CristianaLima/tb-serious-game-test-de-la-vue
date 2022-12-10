import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import {addDoc, collection, doc, getDoc, getDocs, getFirestore} from "firebase/firestore";
import moment from "moment";

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

/**
 * Transform date stringified in local storage to a date for Firebase
 * @param timeToChange
 * @returns {Date}
 */
function dateConverter(timeToChange) {
    let date;
    date = (new Date(timeToChange))
    return date;
}

/**
 * Add school in Firebase
 * @param e
 * @returns {Promise<DocumentReference<DocumentData>>}
 */
export async function addSchool(e) {
    return await addDoc(schoolsDbRef, e);
}

/**
 * Add student in Firebase
 * @param e
 * @returns {Promise<DocumentReference<DocumentData>>}
 */
export async function addStudent(e) {
    e.dob = dateConverter(e.dob);
    return await addDoc(studentsDbRef, e);
}

/**
 * Add test/result in Firebase
 * @param e
 * @returns {Promise<DocumentReference<DocumentData>>}
 */
export async function addTest(e) {
    e.dateTest = dateConverter(e.dateTest);
    return await addDoc(testsDbRef, e);
}

/**
 * Get all schools from Firebase
 * @returns {Promise<*[]>}
 */
export async function getAllSchools() {
    const docsSnap = await getDocs(schoolsDbRef);
    let schools = [];
    docsSnap.forEach(doc => {
            const school = {...doc.data(), id: doc.id}
            schools.push(school);
        }
    );
    return schools;
}

/**
 * Get all Students from Firebase
 * @returns {Promise<*[]>}
 */
export async function getAllStudents() {
    const docsSnap = await getDocs(studentsDbRef);
    let students = [];
    docsSnap.forEach(doc => {
            const student = doc.data();
            const dob = student.dob.toDate();
            const completeStudent = {
                idSchool: student.idSchool,
                class: student.class,
                fullName: student.fullName,
                dob: moment(dob).format('YYYY-MM-DD')
            };
            const studentWithId = {...completeStudent, id: doc.id}
            students.push(studentWithId);
        }
    );
    return students;
}

/**
 * Get all tests/results from Firebase
 * @returns {Promise<*[]>}
 */
export async function getAllTests() {
    const docsSnap = await getDocs(testsDbRef);
    let tests = [];
    docsSnap.forEach(doc => {
            const test = doc.data();
            const date = test.dateTest.toDate();
            const testWithId = {
                id: doc.id,
                idStudent: test.idStudent,
                localIdStudent: undefined,
                dateTest: date,
                correction: test.correction,
                comprehension: test.comprehension,
                rounds: test.rounds,
                vaRe: test.vaRe,
                vaLe: test.vaLe,
                idTherapist: test.idTherapist
            };
            tests.push(testWithId);
        }
    );
    return tests;
}

/**
 * Get test/result information by ID from Firebase
 * @param id
 * @returns {Promise<{[p: string]: any, id: string}>}
 */
export async function getTestsById(id) {
    const docRef = doc(testsDbRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {...docSnap.data(), id: docSnap.id};
    }
}

/**
 * Get student information by ID from Firebase
 * @param id
 * @returns {Promise<{[p: string]: any, id: string}>}
 */
export async function getStudentById(id) {
    const docRef = doc(studentsDbRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {...docSnap.data(), id: docSnap.id};
    }
}

/**
 * Get therapist information by ID from Firebase
 * @param id
 * @returns {Promise<{[p: string]: any, id: string}>}
 */
export async function getTherapistById(id) {
    const docRef = doc(therapistDbRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {...docSnap.data(), id: docSnap.id};
    }
}

/**
 * Get school information by ID from Firebase
 * @param id
 * @returns {Promise<{[p: string]: any, id: string}>}
 */
export async function getSchoolById(id) {
    const docRef = doc(schoolsDbRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {...docSnap.data(), id: docSnap.id};
    }
}