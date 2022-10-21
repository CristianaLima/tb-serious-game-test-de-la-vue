import {
    LS_CURRENT_THERAPIST,
    LS_NEW_STUDENTS,
    LS_NEW_VISUALSTESTS,
    LS_SCHOOLS,
    LS_STUDENTS,
    LS_VISUALSTESTS
} from "../views/App";
import {addStudent, addTest, getAllSchools, getAllStudents, getAllTests, getStudentById} from "./InitFirebase";

export async function synchronise(){
    //Get value in local storage
    const newStudents = JSON.parse(localStorage.getItem(LS_NEW_STUDENTS));

    await synchroniseStudent(newStudents);
    await synchroniseTest(newStudents);

    // Refresh data
    await stockDataInLocalStorage();

    // Clear local storage from pushed data
    localStorage.setItem(LS_NEW_STUDENTS, JSON.stringify([]));
    localStorage.setItem(LS_NEW_VISUALSTESTS, JSON.stringify([]));
}

export async function stockDataInLocalStorage() {
    getAllSchools().then(s => localStorage.setItem(LS_SCHOOLS, JSON.stringify(s)));
    getAllStudents().then(s => localStorage.setItem(LS_STUDENTS, JSON.stringify(s)));
    getAllTests().then(s => localStorage.setItem(LS_VISUALSTESTS, JSON.stringify(s)));
}

export async function synchroniseStudent(newStudents){
    //Get value in local storage
    const schools = JSON.parse(localStorage.getItem(LS_SCHOOLS));

    // Synchronise added student
    for (let i = 0; i < newStudents.length; i++) {
        // Transform idSchool value form just id to ref
        let schoolRef = schools.find((s) => {
            return s.id === newStudents[i].idSchool
        }).ref
        // Reconstruct student to delete value "localId"
        let studentFb = {
            fullName: newStudents[i].fullName,
            class: newStudents[i].class,
            dob: newStudents[i].dob,
            idSchool: schoolRef
        }
        // Add new student to Firebase and get the ref
        addStudent(studentFb).then(
            r => {newStudents[i]={...newStudents[i], id : r.id, ref: r };
                console.log(newStudents[i])
                //TODO: error no clear local storage
            });
    }

}
export async function synchroniseTest(newStudents){
    //Get value in local storage
    const newTests = JSON.parse(localStorage.getItem(LS_NEW_VISUALSTESTS));
    const therapist = JSON.parse(localStorage.getItem(LS_CURRENT_THERAPIST));

    // Synchronise test done
    for (let i = 0; i < newTests.length; i++) {
        if (newTests[i].idStudent != ""){
            // Get the student's ref from Firebase with the IDSTUDENT
            const studentFb = getStudentById(newTests[i].idStudent)
            if (studentFb != false){
                let student = studentFb.ref
                newTests[i].refStudent = student.ref
            } else {
                console.log("Student not found") //todo: catch error ? create student ?
            }
        } else {
            // Get the student's ref from Firebase with the LOCALIDSTUDENT
            let studentRef = newStudents.find((s) => {
                return s.ref === newTests[i].localIdStudent
            }).ref
            newTests[i].refStudent = studentRef;
        }

        // Reconstruct student to delete value "localId"
        let testFb = {
            comprehension : newTests[i].comprehension,
            correction: newTests[i].correction,
            vaLe: newTests[i].vaLe,
            vaRe: newTests[i].vaRe,
            dateTest: newTests[i].dateTest,
            rounds: newTests[i].rounds,
            idStudent: newTests[i].refStudent,
            //idTherapist: therapist.ref //TODO: after Océane therapist code
        }
        // Add new test to Firebase
        addTest(testFb).then(
            r => {newTests[i]={...newTests[i], id : r.id, ref: r };
                console.log(newTests[i])
                //TODO: error no clear local storage
            });
    }
}