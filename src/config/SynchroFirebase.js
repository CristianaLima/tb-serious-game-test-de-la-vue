import {
    LS_NEW_STUDENTS,
    LS_NEW_VISUALSTESTS,
    LS_SCHOOLS,
    LS_STUDENTS,
    LS_VISUALSTESTS
} from "../views/App";
import {
    addStudent,
    addTest,
    getAllSchools,
    getAllStudents,
    getAllTests,
} from "./InitFirebase";

/**
 * Main method for synchronise data in local storage to Firebase
 */
export async function synchronise(){
    // Synchronise students, test and clear local storage from pushed data
   await synchroniseStudents().then(r => synchroniseTests(r)).then(() => clearLocalStorage())

    // Refresh data
    await stockDataInLocalStorage();
}

/**
 * Clear NEW values (student, visual test) in local storage
 */
function clearLocalStorage () {
    localStorage.setItem(LS_NEW_STUDENTS, JSON.stringify([]));
    localStorage.setItem(LS_NEW_VISUALSTESTS, JSON.stringify([]));
}

/**
 * Get data (schools, students, tests) from Firebase and stock in local storage
 */
export async function stockDataInLocalStorage() {
    getAllSchools().then(s => localStorage.setItem(LS_SCHOOLS, JSON.stringify(s)));
    getAllStudents().then(s => localStorage.setItem(LS_STUDENTS, JSON.stringify(s)));
    getAllTests().then(s => localStorage.setItem(LS_VISUALSTESTS, JSON.stringify(s)));
    //TODO: if empty, error handling
}

/**
 * Push new students from local storage to Firebase
 */
async function synchroniseStudents() {
    //Get value in local storage
    let newStudents = JSON.parse(localStorage.getItem(LS_NEW_STUDENTS));

    if (newStudents != null) {
        for (let i = 0; i < newStudents.length; i++) {
            // Add new student to Firebase and set the id
            await addStudent({
                fullName: newStudents[i].fullName,
                class: newStudents[i].class,
                dob: newStudents[i].dob,
                idSchool: newStudents[i].idSchool
            }).then(r => { // Set idStudent from Firebase
                newStudents[i]={...newStudents[i], id : r.id};
                console.log("Student " + newStudents[i].id + " added to Firebase")
            });
        }
    }
    return newStudents
}

/**
 * Push new tests from local storage to Firebase
 */
async function synchroniseTests(newStudentsEdited){
    //Get value in local storage
    const newTests = JSON.parse(localStorage.getItem(LS_NEW_VISUALSTESTS));

    if (newTests != null){
        for (let i = 0; i < newTests.length; i++) {
            // Edit idStudent if it was a new student (from form)
            if (newTests[i].idStudent === undefined){
                newTests[i].idStudent = newStudentsEdited.find((s) => {
                    return s.localId === newTests[i].localIdStudent
                }).id
            }
            // Add new test to Firebase
            await addTest( {
                comprehension : newTests[i].comprehension,
                correction: newTests[i].correction,
                vaLe: newTests[i].vaLe,
                vaRe: newTests[i].vaRe,
                dateTest: newTests[i].dateTest,
                rounds: newTests[i].rounds,
                idTherapist: newTests[i].idTherapist,
                idStudent: newTests[i].idStudent
            }).then(
                r => { //
                    newTests[i]={...newTests[i], id : r.id};
                    console.log("Test " + newTests[i].id + " added to Firebase")
                });
        }
    }

}