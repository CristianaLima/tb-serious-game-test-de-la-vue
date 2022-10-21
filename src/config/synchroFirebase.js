import {
    LS_CURRENT_THERAPIST,
    LS_NEW_STUDENTS,
    LS_NEW_VISUALSTESTS,
    LS_SCHOOLS,
    LS_STUDENTS,
    LS_VISUALSTESTS
} from "../views/App";
import {addStudentFb, addTestFb, getAllSchoolsFb, getAllStudentsFb, getAllTestsFb} from "./InitFirebase";

export async function stockDataInLocalStorage() {
    getAllSchoolsFb().then(s => localStorage.setItem(LS_SCHOOLS, JSON.stringify(s)));
    getAllStudentsFb().then(s => localStorage.setItem(LS_STUDENTS, JSON.stringify(s)));
    getAllTestsFb().then(s => localStorage.setItem(LS_VISUALSTESTS, JSON.stringify(s)));
}

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
        // Add new student to Firebase and get the ref
        addStudentFb(studentFb).then(
            r => {newStudents[i]={...newStudents[i], id : r.id, ref: r };
                console.log(newStudents[i])
            });
    }

    //Test
    const newTests = JSON.parse(localStorage.getItem(LS_NEW_VISUALSTESTS));
    const therapist = JSON.parse(localStorage.getItem(LS_CURRENT_THERAPIST));
    for (let i = 0; i < newTests.length; i++) {
        // Get the student's ref with the localIdStudent
        let studentRef = newStudents.find((s) => {
            return s.ref === newTests[i].localIdStudent
        }).ref
        newTests[i].refStudent = studentRef;
        // Reconstruct student to delete value "localId"
        let testFb = {
            comprehension : newTests[i].comprehension,
            correction: newTests[i].correction,
            vaLe: newTests[i].vaLe,
            vaRe: newTests[i].vaRe,
            dateTest: newTests[i].dateTest,
            rounds: newTests[i].rounds,
            idStudent: studentRef,
            //idTherapist: therapist.ref //TODO: after Océane therapist code
        }
        // Add new test to Firebase
        addTestFb(testFb).then(
            r => {newTests[i]={...newTests[i], id : r.id, ref: r };
                console.log(newTests[i])
            });
    }

    // Refresh data
    await stockDataInLocalStorage();
    localStorage.setItem(LS_NEW_STUDENTS, JSON.stringify([]));
    localStorage.setItem(LS_NEW_VISUALSTESTS, JSON.stringify([]));
}