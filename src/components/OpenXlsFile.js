import * as XLSX from 'xlsx';
import {LS_NEW_SCHOOLS, LS_NEW_STUDENTS, LS_SCHOOLS} from "../views/App";
import moment from "moment";

export default OpenXlsFile;
/**
 * Upload an Excel file to LS_NEW_STUDENTS in local storage
 * @param file
 */
function OpenXlsFile(file){

    /** extract the XLSX file */
    const promise = new Promise((resolve,reject)=>{
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            const bufferArray = e.target.result;
            const wb = XLSX.read(bufferArray,{type:"buffer"});
            const wsname = wb.SheetNames[0];// upload only the first page from excel
            const ws =wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);
            resolve(data);
        }
        fileReader.onerror = (error)=>{
            reject(error);
        }

    });
    promise.then((data)=>{
        let lsNewStudents =  JSON.parse(localStorage.getItem(LS_NEW_STUDENTS));
        let lsNewSchools =  JSON.parse(localStorage.getItem(LS_NEW_SCHOOLS));
        let lsSchools =  JSON.parse(localStorage.getItem(LS_SCHOOLS)).concat(JSON.parse(localStorage.getItem(LS_NEW_SCHOOLS)));
        let studentsToAdd = [];

        const classNum = data[3].__EMPTY_19;// get the class number
        const schoolName = data[3].__EMPTY_5;

        for (let i = 5; i < data.length ; i++) {

            /** transformation date to YYYY-MM-DD */
            const date = data[i].__EMPTY_7;
            const d = date.slice(0,2);
            const m = date.slice(3,5);
            const y = date.slice(6,10);
            const dateObj = new Date(y, m, d);

            const student = {
                localId: Math.round(Date.now() / 1000)+i.toString(),
                class: classNum,
                fullName: data[i].__EMPTY_6,
                dob: moment(dateObj).format('YYYY-MM-DD')
            }
            studentsToAdd = [...studentsToAdd,student]
        }

        /** Add information of the school */
        // If a school already exists with the same name in the database, retrieve its id
        const school = lsSchools.find((s) => {
            return s.name === schoolName;
        });
        if (school !== undefined){
            for (let i = 0; i < studentsToAdd.length; i++) {
                if (studentsToAdd[i].idSchool === undefined) {
                    if (school.id === undefined){
                        studentsToAdd[i] = {localIdSchool: school.localId, ...studentsToAdd[i]};
                    } else {
                        studentsToAdd[i] = {idSchool: school.id, ...studentsToAdd[i]};
                    }
                }
            }
        // If not
        } else {
            let localIdSchool = Math.round(Date.now() / 1000);
            localStorage.setItem(LS_NEW_SCHOOLS,JSON.stringify([...lsNewSchools,{name: schoolName, localId: localIdSchool}]));
            for (let i = 0; i < studentsToAdd.length; i++) {
                if (studentsToAdd[i].idSchool === undefined) {
                    studentsToAdd[i] = {localIdSchool: localIdSchool, ...studentsToAdd[i]};
                }
            }
        }

        /** Stock in local storage */
        lsNewStudents = lsNewStudents.concat(studentsToAdd);
        localStorage.setItem(LS_NEW_STUDENTS, JSON.stringify(lsNewStudents));
    });
}
