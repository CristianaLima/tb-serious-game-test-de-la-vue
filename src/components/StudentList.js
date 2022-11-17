import React from 'react';
import {useState} from "react";
import {LS_NEW_SCHOOLS, LS_NEW_STUDENTS, LS_SCHOOLS, LS_STUDENT, LS_STUDENTS} from "../views/App";
import moment from "moment/moment";

export function StudentsList(){
    const [students] = useState(JSON.parse(localStorage.getItem(LS_STUDENTS)));
    const [newStudents] = useState(JSON.parse(localStorage.getItem(LS_NEW_STUDENTS)));

    function StudentsFromFirebase() {
        if (students.length > 0) {
            return <>

                <h1>Students from school roster</h1>
                <TableConstruction theadData={Object.keys(students[0])} tbodyData={students}/>
            </>;
        }
        return <div/>;
    }

    function NewStudents() {
        if (newStudents.length > 0) {
            return <>
                <h1>New students from this session</h1>
                <TableConstruction theadData={Object.keys(newStudents[0])} tbodyData={newStudents}/>
            </>;
        }
        return <div/>;
    }

    /** Get school name from localIdSchool or idSchool if existent
     * @param student
     */
    function SchoolName(student){
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

    function TableConstruction({theadData, tbodyData}) {
        return (
            <div>
            <table className="table">
                <thead>
                <tr>
                    {theadData.map(heading => {
                        switch(heading) {
                            case "fullName":   return <th style={{width: "20%"}} key={"fullName"}>Full name</th>;
                            case "dob":   return <th style={{width: "20%"}} key={"dob"}>DOB</th>;
                            case "class":   return <th style={{width: "20%"}} key={"class"}>Class</th>;
                            case "idSchool":   return <th style={{width: "20%"}} key={"idSchool"}>School</th>;
                            case "localIdSchool":   return <th style={{width: "20%"}} key={"idSchool"}>School</th>;
                            default: return <></>}
                    })}
                    <th  style={{width: "20%"}} key={"button"}></th>
                </tr>
                </thead>
                <tbody>
                {tbodyData.map((row, index) => {
                    return <tr key={index}>
                        {theadData.map((key, index) => {
                            switch(key) {
                                case "fullName":   return  <td key={index}>{row[key]}</td>;
                                case "dob": return <td key={index}>{moment(row[key]).format('DD MMMM yyyy')}</td>;
                                case "class":   return  <td key={index}>{row[key]}</td>;
                                case "idSchool":   return <td key={index}>{SchoolName(row)}</td>
                                case "localIdSchool":   return <td key={index}>{SchoolName(row)}</td>
                                default: return <></>}
                        })}
                        <td><button className="btn btn-outline-primary"
                                                            onClick={() => {
                                                                localStorage.setItem(LS_STUDENT, JSON.stringify( row));
                                                                window.open('/acuityTestScreen', '_self')
                                                                window.open('/acuityTestController', '_blank');
                                                            }}>
                            Select this student</button></td>
                    </tr>;
                })}
                </tbody>
            </table>
            </div>
        );
    }

    return(
        <div className="px-3 m-auto w-75 my-2 text-center">
            <StudentsFromFirebase/>
            <NewStudents/>
        </div>
    )
}