import {
    LS_CURRENT_THERAPIST,
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
    getAllTests, getSchoolById,
    getStudentById
} from "./InitFirebase";

export async function synchronise(){
    //Get value in local storage
    let newStudents = JSON.parse(localStorage.getItem(LS_NEW_STUDENTS));

    await synchroniseStudent(newStudents);
    await synchroniseTest(newStudents);

    // Refresh data
    await stockDataInLocalStorage();

    // Clear local storage from pushed data
    //TODO: check that all element has a id from firebase before deletes

    for (let i = newStudents.length-1; i > -1; i--) {
        if (newStudents[i].id !== ""){
            newStudents = newStudents.filter((item, j) => j !== i)
        }
    }
    localStorage.setItem(LS_NEW_STUDENTS, JSON.stringify(newStudents));
    localStorage.setItem(LS_NEW_VISUALSTESTS, JSON.stringify([]));
}

export async function stockDataInLocalStorage() {
    getAllSchools().then(s => localStorage.setItem(LS_SCHOOLS, JSON.stringify(s)));
    getAllStudents().then(s => localStorage.setItem(LS_STUDENTS, JSON.stringify(s)));
    getAllTests().then(s => localStorage.setItem(LS_VISUALSTESTS, JSON.stringify(s)));
    //TODO: if empty, error handling
}

export async function synchroniseStudent(newStudents){
    // Synchronise added student
    if (newStudents != null){
        for (let i = 0; i < newStudents.length; i++) {
                // Reconstruct student to delete value "localId"
                let studentToPush = {
                    fullName: newStudents[i].fullName,
                    class: newStudents[i].class,
                    dob: newStudents[i].dob,
                    idSchool: newStudents[i].idSchool
                };
                // Add new student to Firebase and set the id
                addStudent(studentToPush).then(r => {
                    newStudents[i]={...newStudents[i], id : r.id};
                    console.log("Student " + newStudents[i].id + " added to Firebase")
                    });

        }
    }

}
export async function synchroniseTest(newStudents){
    //Get value in local storage
    const newTests = JSON.parse(localStorage.getItem(LS_NEW_VISUALSTESTS));
    const therapist = JSON.parse(localStorage.getItem(LS_CURRENT_THERAPIST));

    // Synchronise test done
    //TODO: test when test page --> see working school ref in synchroniseStudent
    if (newTests != null){
        for (let i = 0; i < newTests.length; i++) {
            if (newTests[i].idStudent == ""){
                // Set the student's id from Firebase with the LOCALIDSTUDENT
                newTests[i].idStudent = newStudents.find((s) => {
                    return s.localIdStudent === newTests[i].localIdStudent
                }).id
            }

            // Reconstruct student to delete value "localId"
            let testFb = {
                comprehension : newTests[i].comprehension,
                correction: newTests[i].correction,
                vaLe: newTests[i].vaLe,
                vaRe: newTests[i].vaRe,
                dateTest: newTests[i].dateTest,
                rounds: newTests[i].rounds,
                idStudent: newTests[i].idStudent,
                idTherapist: therapist.id
            }
            // Add new test to Firebase
            addTest(testFb).then(
                r => {newTests[i]={...newTests[i], id : r.id};
                    console.log("Test " + newTests[i].id + " added to Firebase")
                });
        }
    }

}