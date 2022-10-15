import React from 'react';
import {NavBar} from "../components/NavBar";
import StudentForm from "../components/StudentForm";

export function AcuityTestScreen(){
    return(
        <div>
            <NavBar/>
            <div className="px-3 m-auto w-75 my-2 text-center">
                <h1>NEW TEST: STUDENT INFO</h1>
                <button type="button" className="btn btn-primary">Select student from school roster TODO</button>
                <StudentForm/>
            </div>

        </div>
    )
}