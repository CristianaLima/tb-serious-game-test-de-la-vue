import React, {useEffect, useState} from 'react';
import {NavBar} from "../components/NavBar";
import CImage from "../components/CImage";
import {LS_STUDENT} from "./App";

export function AcuityTestScreen(){
    const [student, setStudent] = useState({
        fullName: "",
        class: ""
    });

    useEffect(() => {
        setStudent(JSON.parse(localStorage.getItem(LS_STUDENT)))
    }, []);

    return(
        <>
            <NavBar/>
            {student == null ? <></> :  <div> {student.fullName} - Class: {student.class}} </div>}
            <CImage/>
        </>
    )
}
