import React from 'react';
import {NavBar} from "../components/NavBar";
import StudentForm from "../components/StudentForm";
import {useState} from "react";
import {LS_STUDENTS} from "./App";
import {StudentsTable} from "../components/StudentsTable";
import {useNavigate} from "react-router-dom";

export function AcuityTestScreen(){
    const [students] = useState(JSON.parse(localStorage.getItem(LS_STUDENTS)));
    const navigate = useNavigate();

    function StudentsFromFirebase() {
        if (students.length > 0) {
            return <div>
                <StudentsTable theadData={Object.keys(students[0])} tbodyData={students}/>
                <button type="button" className="btn btn-danger btn-lg m-5"  onClick={() => {
                    navigate("/acuityTestScreen")}}>GO BACK TO STUDENT INFO
                </button>
            </div>;
        }
        return <div/>;
    }

    //TODO: When click on "Select student from school roster"
    // replace <StudentForm/> by <StudentsFromFirebase/>
    // when it's ok hide <StudentsFromFirebase/> by default
    return(
        <div>
            <NavBar/>
            <div className="px-3 m-auto w-75 my-2 text-center">
                <h1>NEW TEST: STUDENT INFO</h1>
                <button type="button" className="btn btn-primary">Select student from school roster TODO</button>
                <StudentForm/>
                <h4 className="bg-danger">READ TODO IN CODE</h4>
                <StudentsFromFirebase/>
            </div>

        </div>
    )
}