import {LS_NEW_SCHOOLS, LS_SCHOOLS} from "../views/App";

/** Get school name from localIdSchool or idSchool if existent
 * @param student
 */
export function SchoolName(student){
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