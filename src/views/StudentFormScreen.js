import React from 'react';
import {NavBar} from "../components/NavBar";
import StudentForm from "../components/StudentForm";
import {useNavigate} from "react-router-dom";

export function StudentFormScreen(){
    const navigate = useNavigate();

    return(
        <div>
            <NavBar/>
            <div className="px-3 m-auto w-75 my-2 text-center">
                <h1>NEW TEST: STUDENT INFO</h1>
                <button type="button" className="btn btn-primary" onClick={() => {
                    navigate("/studentsListScreen")
                }}>
                        Select student from school roster
                   </button>
                <StudentForm/>
            </div>

        </div>
    )
}