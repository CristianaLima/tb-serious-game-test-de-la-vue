import React, {useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import {stockDataInLocalStorage} from "../config/SynchroFirebase";
import {getTherapistById} from "../config/InitFirebase";
import {
    LS_CURRENT_THERAPIST,
    LS_NEW_RESULTS,
    LS_NEW_SCHOOLS,
    LS_NEW_STUDENTS,
    LS_RESULTS,
    LS_SCHOOLS,
    LS_STUDENTS,
    LS_LANGUAGE,
} from "./App";
import {useNavigate} from "react-router-dom";
import {Button} from "reactstrap";
import Script from "../script/Script";

export default Home;

/**
 * Home page allows to initialize the local storage and display 2 buttons (View results and Start game)
 *
 * navigate : to move from one page to another
 * newSchools : used to initialize LS_NEW_SCHOOLS if is null
 * newStudents : used to initialize LS_NEW_STUDENTS if is null
 * newTests : used to initialize LS_NEW_RESULTS if is null
 * online : used to display error page if no internet connection
 */
function Home() {
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

    /**
     * If no data exists already, initializes with an empty array the local storage values used for the data generated
     * on this browser (LS_NEW_SCHOOLS, LS_NEW_STUDENTS, LS_NEW_RESULTS)
     */
    if (newSchools === null) {
        localStorage.setItem(LS_NEW_SCHOOLS, JSON.stringify([]));
    }
    if (newStudents === null) {
        localStorage.setItem(LS_NEW_STUDENTS, JSON.stringify([]));
    }
    if (newTests === null) {
        localStorage.setItem(LS_NEW_RESULTS, JSON.stringify([]));
    }


    /**
     * Called at page load, this useEffect retrieves data from the database if there is an internet connection.
     *
     * TODO
     * The TO DO indicates that currently the only therapist in the database is loaded in the local storage
     * (LS_CURRENT_THERAPIST). The id of the current therapist is used when creating a test.
     * This value should be replaced by the id of the connected therapist once the connection is added to the app.
     *
     * WARNING
     * If one of the values of the local storage has not been initialized by an empty array, it generates errors.
     * The value "online" allows the user to be redirected to a page inviting him to try again.
     * Without this, the application cannot work.
     */
    useEffect(() => {
        if (localStorage.getItem(LS_LANGUAGE) === null){
            console.log(localStorage.getItem(LS_LANGUAGE))
            localStorage.setItem(LS_LANGUAGE, JSON.stringify("en"));
        }
        if (online === true) {
            fetch('https://www.google.com/', {
                mode: 'no-cors',
            })
                .then(() => {
                    //TODO: adapt when login implemented
                    getTherapistById("Q37DGWV9sr38tqyWJMVX").then(t => localStorage.setItem(LS_CURRENT_THERAPIST, JSON.stringify(t)));
                    stockDataInLocalStorage().then(() => console.log("Data load"));
                }).catch(() => {
                if (localStorage.getItem(LS_RESULTS) === null || localStorage.getItem(LS_STUDENTS) === null || localStorage.getItem(LS_SCHOOLS) === null) {
                    setOnline(false);
                }
            })
        }
    }, []);

    /**
     * Shows a page with the navbar and 2 buttons if there were no problems loading the data.
     * If not, shows the user a single button (Retry) to allow the data to load properly.
     */
    return (
        <>
            {localStorage.getItem(LS_RESULTS) === null || localStorage.getItem(LS_STUDENTS) === null || localStorage.getItem(LS_SCHOOLS) === null ?
                <div className="Error">
                    <div className="px-3 m-auto w-75 my-2 text-center">
                        <h3>No data loaded</h3>
                        <Button color="primary" onClick={() => window.location.reload()}>
                            Retry
                        </Button>
                    </div>
                </div>
                :
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
                        {/*<Script></Script>*/}
                    </div>
                </div>
            }
        </>
    );
}