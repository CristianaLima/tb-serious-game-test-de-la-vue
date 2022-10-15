import React from 'react';
import {NavBar} from "../components/NavBar";
import StudentForm from "../components/StudentForm";

export function AcuityTestScreen(){
    return(
        <div>
            <NavBar></NavBar>
            <div className="px-3 m-auto w-75 my-2 text-center">
                <h1>Test screen</h1>
                <StudentForm></StudentForm>
            </div>

        </div>
    )
}