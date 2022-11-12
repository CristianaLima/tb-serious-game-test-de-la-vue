import React from 'react';
import {useState} from "react";
import {LS_STUDENT, LS_STUDENTS} from "../views/App";

export function StudentsList(){
    const [students] = useState(JSON.parse(localStorage.getItem(LS_STUDENTS)));

    function StudentsFromFirebase() {
        if (students.length > 0) {
            return <div>
                <TableConstruction theadData={Object.keys(students[0])} tbodyData={students}/>
            </div>;
        }
        return <div/>;
    }

    function TableConstruction({theadData, tbodyData}) {
        return (
            <table className="table">
                <thead>
                <tr>
                    {theadData.map(heading => {
                        return <th key={heading}>{heading}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {tbodyData.map((row, index) => {
                    return <tr key={index}>
                        {theadData.map((key, index) => {
                            return <td key={index}>{row[key]}</td>
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
        );
    }

    return(
            <div className="px-3 m-auto w-75 my-2 text-center">
                <StudentsFromFirebase/>
            </div>
    )
}