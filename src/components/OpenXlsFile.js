import * as XLSX from 'xlsx';
import {LS_NEW_SCHOOLS, LS_NEW_STUDENTS, LS_SCHOOLS} from "../views/App";
import moment from "moment";

/**
 * Upload an Excel file to tab NewStudent in local storage
 * @param file
 * @constructor
 */
export function OpenXlsFile(file){

//extract the XLSX file
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
        console.log(data);
        let lsNewStudents =  JSON.parse(localStorage.getItem(LS_NEW_STUDENTS));
        let lsNewSchools =  JSON.parse(localStorage.getItem(LS_NEW_SCHOOLS));
        let lsSchools =  JSON.parse(localStorage.getItem(LS_SCHOOLS));
        let studentsToAdd = [];

        const classNum = data[3].__EMPTY_19;// get the class number
        const schoolName = data[0].__EMPTY_3.replace(/(\r\n|\n|\r)/gm, " ");

        for (let i = 5; i < data.length ; i++) {

            //transformation date to dd/mm/yyyy
            const date = data[i].__EMPTY_7;
            const d = date.slice(0,2);
            const m = date.slice(3,5);
            const y = date.slice(6,10);
            const dateObj = new Date(y, m, d)

            const student = {
                localId: Math.round(Date.now() / 1000)+i.toString(),
                class: classNum,
                fullName: data[i].__EMPTY_6,
                dob: moment(dateObj).format('YYYY-MM-DD')
            }
            studentsToAdd = [...studentsToAdd,student]
        }

        const school = lsSchools.find((s) => {
            return s.name === schoolName;
        });
        // if school is not undefined, it's not a new school
        if (school !== undefined){
            for (let i = 0; i < studentsToAdd.length; i++) {
                if (studentsToAdd[i].idSchool == undefined) {
                    studentsToAdd[i] = {idSchool: school.id, ...studentsToAdd[i]};
                }
            }
        } else {
            let localIdSchool = Math.round(Date.now() / 1000);
            localStorage.setItem(LS_NEW_SCHOOLS,JSON.stringify([...lsNewSchools,{name: schoolName, localId: localIdSchool}]));
            for (let i = 0; i < studentsToAdd.length; i++) {
                if (studentsToAdd[i].idSchool == undefined) {
                    studentsToAdd[i] = {localIdSchool: localIdSchool, ...studentsToAdd[i]};
                }
            }
        }
        lsNewStudents = lsNewStudents.concat(studentsToAdd);
        localStorage.setItem(LS_NEW_STUDENTS, JSON.stringify(lsNewStudents));
    });

}
