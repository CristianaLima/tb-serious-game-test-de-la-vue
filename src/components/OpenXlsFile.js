import * as XLSX from 'xlsx';
import {LS_NEW_STUDENTS} from "../views/App";

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
    promise.then((d)=>{
        console.log(d);
        let lsStudents =  JSON.parse(localStorage.getItem(LS_NEW_STUDENTS)) || [];
        const classNum = d[3].__EMPTY_19;// upload the class number
        const schoolName = d[0].__EMPTY_3; // TODO getIdSchool or school creation
        for (let i = 5; i < d.length ; i++) {
            const student = {
                localId: Math.round(Date.now() / 1000)+i.toString(),
                fullName: d[i].__EMPTY_6,
                class: classNum,
                dob: d[i].__EMPTY_7,
                school: schoolName}
            lsStudents = [...lsStudents,student]
        }
        localStorage.setItem(LS_NEW_STUDENTS, JSON.stringify(lsStudents));
    });

}
