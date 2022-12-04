import React, {useEffect, useState} from "react";
import {NavBar} from "../components/NavBar";
import {stockDataInLocalStorage} from "../config/SynchroFirebase";
import {getTherapistById} from "../config/InitFirebase";
import {
    LS_CURRENT_THERAPIST,
    LS_NEW_SCHOOLS,
    LS_NEW_STUDENTS,
    LS_NEW_RESULTS,
    LS_RESULTS,
} from "./App";
import {useNavigate} from "react-router-dom";
import {Button} from "reactstrap";

export function Home(){
    const navigate = useNavigate();
    // Load local storage if exist or initialise it
    const [newSchools] = useState(() => {
        return JSON.parse(localStorage.getItem(LS_NEW_SCHOOLS));
    });
    const [newStudents] = useState(() => {
        return JSON.parse(localStorage.getItem(LS_NEW_STUDENTS));
    });
    const [newTests] = useState(() => {
        return JSON.parse(localStorage.getItem(LS_NEW_RESULTS));
    });
    const [online, setOnline] = useState(navigator.onLine);

    useEffect(() => {
        // If internet connection, load data from Firebase
        if (online === true) {
            fetch('https://www.google.com/', { // Check for internet connectivity
                mode: 'no-cors',
            })
                .then(() => {
                    //TODO: adapt when login
                    getTherapistById("X6ITtB97ZhCqf4Uw3yhH").then(t => localStorage.setItem(LS_CURRENT_THERAPIST, JSON.stringify(t)));
                    stockDataInLocalStorage().then(() => console.log("Data load"))
                }).catch(() => {
                    if (localStorage.getItem(LS_RESULTS)===null){
                        setOnline(false)
                    }
            }  )
        }
        // Initialize new array in local storage if first opening
        if (newSchools === null){
            localStorage.setItem(LS_NEW_SCHOOLS, JSON.stringify([]));
        }
        if (newStudents === null){
            localStorage.setItem(LS_NEW_STUDENTS, JSON.stringify([]));
        }
        if (newTests === null){
            localStorage.setItem(LS_NEW_RESULTS, JSON.stringify([]));
        }
    }, []);

    return(
        <>
            {online ?
                <div className="Home">
                    <NavBar/>
                    <div className="px-3 m-auto w-75 my-2 text-center">
                        <h1>Welcome [Therapist name]</h1>
                        <Button className="m-5" size="lg" color="primary" onClick={() => navigate('/viewResults')}>
                            View results
                        </Button>
                        <Button className="m-5" size="lg" color="success" onClick={() => navigate('/startGame')}>
                            Start game
                        </Button>
                    </div>
                </div>
                :
                <div className="Error">
                    <div className="px-3 m-auto w-75 my-2 text-center">
                        <h3>No data loaded</h3>
                        <Button color="primary" onClick={() => window.location.reload()}>
                            Retry
                        </Button>
                    </div>
                </div>
            }
        </>
    )
}