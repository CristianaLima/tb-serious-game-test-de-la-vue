import React from 'react';
import {NavBar} from "../components/NavBar";
import StudentForm from "../components/StudentForm";

export function AcuityTestScreen(){
    return(
        <div>
            <NavBar></NavBar>
            <h1>Test screen</h1>
            <StudentForm></StudentForm>
        </div>
    )
}