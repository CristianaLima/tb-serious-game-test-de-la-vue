import {LS_NEW_SCHOOLS, LS_NEW_STUDENTS, LS_SCHOOLS, LS_STUDENTS} from "../views/App";

/** Get school name from localIdSchool or idSchool in student if existing
 * @param student
 */
export function getSchoolNameFromLS(student){
    const newSchools = JSON.parse(localStorage.getItem(LS_NEW_SCHOOLS));
    const schools = JSON.parse(localStorage.getItem(LS_SCHOOLS));
    const concatSchools = newSchools.concat(schools);
    for (let i = 0; i < concatSchools.length; i++) {
        if (student.localIdSchool !== undefined){
            if (concatSchools[i].localId === student.localIdSchool){
                return concatSchools[i].name;
            }
        } else {
            if (concatSchools[i].id === student.idSchool){
                return concatSchools[i].name;
            }
        }
    }
}

/** Get student from localIdStudent or idStudent in test if existing
 * @param test
 */
export function getStudentFromLS(test){
    const newStudents = JSON.parse(localStorage.getItem(LS_NEW_STUDENTS));
    const students = JSON.parse(localStorage.getItem(LS_STUDENTS));
    const concatStudents = newStudents.concat(students);
    for (let i = 0; i < concatStudents.length; i++) {
        if (test.localIdStudent !== undefined){
            if (concatStudents[i].localId === test.localIdStudent){
                return concatStudents[i];
            }
        } else {
            if (concatStudents[i].id === test.idStudent){
                return concatStudents[i];
            }
        }
    }
}