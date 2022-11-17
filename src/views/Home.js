import React, {useEffect, useState} from "react";
import {NavBar} from "../components/NavBar";
import {stockDataInLocalStorage} from "../config/SynchroFirebase";
import {getTherapistById} from "../config/InitFirebase";
import {LS_CURRENT_THERAPIST, LS_NEW_SCHOOLS, LS_NEW_STUDENTS, LS_NEW_VISUALSTESTS} from "./App";
import StudentForm from "../components/StudentForm";
import {StudentsList} from "../components/StudentList";
import {OpenXlsFile} from "../components/OpenXlsFile";



export function Home(){
    const [content, setContent] = useState(0)
    // Load local storage if exist or initialise it
    const [newSchools] = useState(() => {
        return JSON.parse(localStorage.getItem(LS_NEW_SCHOOLS));
    });
    const [newStudents] = useState(() => {
        return JSON.parse(localStorage.getItem(LS_NEW_STUDENTS));
    });
    const [newTests] = useState(() => {
        return JSON.parse(localStorage.getItem(LS_NEW_VISUALSTESTS));
    });



    useEffect(() => {
        // If internet connection, load data from Firebase
        //TODO: double with navbar
        let condition = navigator.onLine ? 'online' : 'offline';
        if (condition === 'online') {
            fetch('https://www.google.com/', { // Check for internet connectivity
                mode: 'no-cors',
            })
                .then(() => {
                    getTherapistById("X6ITtB97ZhCqf4Uw3yhH").then(t => localStorage.setItem(LS_CURRENT_THERAPIST, JSON.stringify(t)));
                    stockDataInLocalStorage().then(() => console.log("Data load"))
                }).catch(() => {
            }  )
        }
        // Initialize new array in local storage if first opening
        if (newSchools === null){
            console.log("schools null")
            localStorage.setItem(LS_NEW_SCHOOLS, JSON.stringify([]));
        }
        if (newStudents === null){
            console.log("students null")
            localStorage.setItem(LS_NEW_STUDENTS, JSON.stringify([]));
        }
        if (newTests === null){
            console.log("tests null")
            localStorage.setItem(LS_NEW_VISUALSTESTS, JSON.stringify([]));
        }
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

                            <input type="file"  onChange={(e)=>{
                                const file = e.target.files[0];
                                OpenXlsFile(file);
                                window.location.reload();
                                window.alert("File "+file.name.toString()+" uploaded")
                            }}/>


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