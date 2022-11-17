import {
    LS_NEW_SCHOOLS,
    LS_NEW_STUDENTS,
    LS_NEW_VISUALSTESTS,
    LS_SCHOOLS,
    LS_STUDENTS,
    LS_VISUALSTESTS
} from "../views/App";
import {
    addSchool,
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
    // Synchronise schools, students and tests then clear local storage from pushed data
   await synchroniseSchools().then(sc => synchroniseStudents(sc).then(st => synchroniseTests(st)).then(() => {clearLocalStorage()}));

    // Refresh data
    await stockDataInLocalStorage();
}

/**
 * Clear NEW values (schools, students, visual tests) in local storage
 */
function clearLocalStorage () {
    localStorage.setItem(LS_NEW_STUDENTS, JSON.stringify([]));
    localStorage.setItem(LS_NEW_VISUALSTESTS, JSON.stringify([]));
    localStorage.setItem(LS_NEW_SCHOOLS, JSON.stringify([]));
}

/**
 * Get data (schools, students, tests) from Firebase and stock in local storage
 */
export async function stockDataInLocalStorage() {
    getAllSchools().then(schools => {
        localStorage.setItem(LS_SCHOOLS, JSON.stringify(schools))
        getAllStudents().then(students => {
            localStorage.setItem(LS_STUDENTS, JSON.stringify(students))
            getAllTests(students).then(tests => localStorage.setItem(LS_VISUALSTESTS, JSON.stringify(tests)));
        });
    });

    //TODO: if empty, error handling
}

/**
 * Push new schools from local storage to Firebase
 */
async function synchroniseSchools() {
    //Get value in local storage
    let newSchools = JSON.parse(localStorage.getItem(LS_NEW_SCHOOLS));

    if (newSchools != null) {
        for (let i = 0; i < newSchools.length; i++) {
            // Add new student to Firebase and set the id
            await addSchool({
                name: newSchools[i].name
            }).then(r => { // Set idStudent from Firebase
                newSchools[i]={...newSchools[i], id : r.id};
                console.log("School " + newSchools[i].id + " added to Firebase");
            });
        }
    }
    return newSchools
}

/**
 * Push new students from local storage to Firebase
 */
async function synchroniseStudents(newSchoolsEdited) {
    //Get value in local storage
    let newStudents = JSON.parse(localStorage.getItem(LS_NEW_STUDENTS));

    if (newStudents != null) {
        for (let i = 0; i < newStudents.length; i++) {
            // Edit idSchool if it was a new school (from excel import)
            if (newStudents[i].idSchool === undefined){
                newStudents[i].idSchool = newSchoolsEdited.find((s) => {
                    return s.localId === newStudents[i].localIdSchool
                }).id
            }
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