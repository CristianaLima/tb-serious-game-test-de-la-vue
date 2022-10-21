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
    getAllTests, getSchoolWithRefById,
    getStudentWithRefById
} from "./InitFirebase";

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
    if (newStudents != null){
        for (let i = 0; i < newStudents.length; i++) {
            // Transform idSchool value form just id to ref
            /*let school = schools.find((s) => {
                return s.id === newStudents[i].idSchool
            })
            // school.ref is interpreted like a map in firebase...
            */
            getSchoolWithRefById(newStudents[i].idSchool).then(s => {
                // Reconstruct student to delete value "localId"
                let studentToPush = {
                    fullName: newStudents[i].fullName,
                    class: newStudents[i].class,
                    dob: newStudents[i].dob,
                    idSchool: s.ref
                };
                // Add new student to Firebase and get the ref
                addStudent(studentToPush).then(r => {
                    newStudents[i]={...newStudents[i], id : r.id, ref: r };
                    console.log(newStudents[i].id + " added to firebase")
                    //TODO: error no clear local storage
                    });
            })
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
            if (newTests[i].idStudent !== ""){
                // Get the student's ref from Firebase with the IDSTUDENT
                const studentFb = getStudentWithRefById(newTests[i].idStudent)
                if (studentFb !== false){
                    let student = studentFb.ref
                    newTests[i].refStudent = student.ref
                } else {
                    console.log("Student not found") //todo: catch error ?
                }
            } else {
                // Get the student's ref from Firebase with the LOCALIDSTUDENT
                newTests[i].refStudent = newStudents.find((s) => {
                    return s.ref === newTests[i].localIdStudent
                }).ref
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
                idTherapist: therapist.ref
            }
            // Add new test to Firebase
            addTest(testFb).then(
                r => {newTests[i]={...newTests[i], id : r.id, ref: r };
                    console.log(newTests[i])
                    //TODO: error no clear local storage
                });
        }
    }

}