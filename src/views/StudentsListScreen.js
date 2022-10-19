import React from 'react';
import {NavBar} from "../components/NavBar";
import StudentForm from "../components/StudentForm";
import {useState} from "react";
import {LS_STUDENTS} from "./App";
import {StudentsTable} from "../components/StudentsTable";
import {useNavigate} from "react-router-dom";

export function StudentsListScreen(){
    const [students] = useState(JSON.parse(localStorage.getItem(LS_STUDENTS)));
    const navigate = useNavigate();

    function StudentsFromFirebase() {
        if (students.length > 0) {
            return <div>
                <StudentsTable theadData={Object.keys(students[0])} tbodyData={students}/>
            </div>;
        }
        return <div/>;
    }

    return(
        <div>
            <NavBar/>
            <div className="px-3 m-auto w-75 my-2 text-center">
                <StudentsFromFirebase/>
            </div>
            <button type="button" className="btn btn-danger btn-lg m-5"
                    onClick={() => {navigate("/studentFormScreen")}}>
                GO BACK TO STUDENT INFO
            </button>

        </div>
    )
}