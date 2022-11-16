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
    promise.then((data)=>{
        console.log(data);
        let lsStudents =  JSON.parse(localStorage.getItem(LS_NEW_STUDENTS)) || [];
        const classNum = data[3].__EMPTY_19;// upload the class number
        const schoolName = data[0].__EMPTY_3; // TODO getIdSchool or school creation
        for (let i = 5; i < data.length ; i++) {

            //transformation date to dd/mm/yyyy
            const date = data[i].__EMPTY_7;
            const d = date.slice(0,2);
            const m = date.slice(3,5);
            const y = date.slice(6,10);
            const dateObj = new Date(y, m, d)

            const student = {
                localId: Math.round(Date.now() / 1000)+i.toString(),
                fullName: data[i].__EMPTY_6,
                dob: dateObj,
                class: classNum,
                school: schoolName}
            lsStudents = [...lsStudents,student]
        }
        localStorage.setItem(LS_NEW_STUDENTS, JSON.stringify(lsStudents));
    });

}
