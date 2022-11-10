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

export async function synchronise(){


   await synchroniseStudents().then(r => synchroniseTest(r))
    //await synchroniseTest();

    /*for (let i = newStudents.length-1; i > -1; i--) {
        if (newStudents[i].id !== ""){
            newStudents = newStudents.filter((item, j) => j !== i)
        }
    }*/

    // Refresh data
    //await stockDataInLocalStorage();

    // Clear local storage from pushed data
    //TODO: check that all element has a id from firebase before deletes
    //localStorage.setItem(LS_NEW_STUDENTS, JSON.stringify([]));
    //localStorage.setItem(LS_NEW_VISUALSTESTS, JSON.stringify([]));
}

export async function stockDataInLocalStorage() {
    getAllSchools().then(s => localStorage.setItem(LS_SCHOOLS, JSON.stringify(s)));
    getAllStudents().then(s => localStorage.setItem(LS_STUDENTS, JSON.stringify(s)));
    getAllTests().then(s => localStorage.setItem(LS_VISUALSTESTS, JSON.stringify(s)));
    //TODO: if empty, error handling
}

export async function synchroniseStudents() {
    //Get value in local storage
    let newStudents = JSON.parse(localStorage.getItem(LS_NEW_STUDENTS));
    const newStudentsEdited = []

    if (newStudents != null) {
        for (let i = 0; i < newStudents.length; i++) {
            // Add new student to Firebase and set the id
            await addStudent({
                fullName: newStudents[i].fullName,
                class: newStudents[i].class,
                dob: newStudents[i].dob,
                idSchool: newStudents[i].idSchool
            }).then(r => {
                newStudentsEdited.push({...newStudents[i], idStudent: r.id})
                newStudents[i] = {...newStudents[i], idStudent: r.id};
                console.log("Student " + newStudents[i].id + " added to Firebase")
            });
            //console.log(newStudents)
        }
    }
    console.log(newStudentsEdited)
    return newStudentsEdited
}

export async function synchroniseTest(newStudentsEdited){
    //Get value in local storage
    const newTests = JSON.parse(localStorage.getItem(LS_NEW_VISUALSTESTS));

    if (newTests != null){
        for (let i = 0; i < newTests.length; i++) {
            console.log(newTests[i])
            if (newTests[i].idStudent == undefined){
                //const student = newStudentsEdited.filter(s => { return s.localIdStudent === newTests[i].localIdStudent})

                const index = newStudentsEdited.findIndex((s) => {
                    return s.localId === newTests[i].localIdStudent
                })

                // Set the student's id from Firebase with the LOCALIDSTUDENT
                // Reconstruct student to delete value "localId"
                let testFb = {}
                // Add new test to Firebase
                addTest( {
                    comprehension : newTests[i].comprehension,
                    correction: newTests[i].correction,
                    vaLe: newTests[i].vaLe,
                    vaRe: newTests[i].vaRe,
                    dateTest: newTests[i].dateTest,
                    rounds: newTests[i].rounds,
                    idTherapist: newTests[i].idTherapist,
                    idStudent: newStudentsEdited[index].idStudent
                }).then(
                    r => {newTests[i]={...newTests[i], id : r.id};
                        console.log("Test " + newTests[i].id + " added to Firebase")
                    });

            }



        }
    }

}