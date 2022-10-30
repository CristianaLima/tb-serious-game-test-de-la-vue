import React from 'react';
import {useState} from "react";
import {StudentsTable} from "../components/StudentsTable";
import {LS_STUDENTS} from "../views/App";

export function StudentsList(){
    const [students] = useState(JSON.parse(localStorage.getItem(LS_STUDENTS)));

    function StudentsFromFirebase() {
        if (students.length > 0) {
            return <div>
                <StudentsTable theadData={Object.keys(students[0])} tbodyData={students}/>
            </div>;
        }
        return <div/>;
    }

    return(
            <div className="px-3 m-auto w-75 my-2 text-center">
                <StudentsFromFirebase/>
            </div>
    )
}