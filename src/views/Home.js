import React, {useEffect, useState} from "react";
import {NavBar} from "../components/NavBar";
import {stockDataInLocalStorage} from "../config/SynchroFirebase";
import {getTherapistById} from "../config/InitFirebase";
import {LS_CURRENT_THERAPIST} from "./App";
import StudentForm from "../components/StudentForm";
import {StudentsList} from "../components/StudentList";

export function Home(){
    const [content, setContent] = useState(0)

    useEffect(() => {
        getTherapistById("X6ITtB97ZhCqf4Uw3yhH").then(t => localStorage.setItem(LS_CURRENT_THERAPIST, JSON.stringify(t)));
        stockDataInLocalStorage().then(() => console.log("Data load"))
    }, []);

    return(
        <div className="Home">
            <NavBar/>
            <>
                {content===0 ? <div className="px-3 m-auto w-75 my-2 text-center">
                        <button type="button" className="btn btn-primary btn-lg m-5">Results TODO</button>
                        <button type="button" className="btn btn-success btn-lg m-5"  onClick={() => {setContent(1)}}>
                            New Test
                        </button>
                    </div> :
                    <>
                    {content===1 ?
                        <div className="px-3 m-auto w-75 my-2 text-center">
                            <h1>NEW TEST: STUDENT INFO</h1>
                            <button type="button" className="btn btn-primary" onClick={() => {
                                setContent(2)
                            }}>
                                Select student from school roster
                            </button>
                            <StudentForm/>
                        </div>
                        : <>
                            <StudentsList/>
                        <button type="button" className="btn btn-danger btn-lg m-5"
                                onClick={() => {setContent(1)}}>
                            GO BACK TO STUDENT INFO
                        </button>
                    </>}
                </>}
            </>

        </div>
            )
}