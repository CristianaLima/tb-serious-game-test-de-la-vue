import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import CImage from "../components/CImage";
import {LS_STUDENT} from "./App";
import "../css/AcuityTestScreen.css";

export default AcuityTestScreen;

/**
 * The page ./acuityTestScreen display the navbar and ...
 * During the test: the student's name + cImage (he results of the algorithm and the C of landolt)
 * At the end of the test: the student's name  + cImage (the results of the algorithm and 3 buttons (Back to home,
 * View results, Start Game))
 *
 * student : student displayed at the top of the page
 */
function AcuityTestScreen() {
    const [windowDimensions] = useState(getWindowDimensions());
    const [student, setStudent] = useState({
        fullName: "",
        class: ""
    });


    function getWindowDimensions() {
        const {innerWidth: width, innerHeight: height} = window;
        return {
            width,
            height
        };
    }

    /**
     * Set the student displayed with info
     */
    useEffect(() => {
        setStudent(JSON.parse(localStorage.getItem(LS_STUDENT)))
    }, []);

    return (
        <div >
            <NavBar/>
            <div className="beforeNav" style={{height:windowDimensions.height-57}}>
                {student == null ? <></> : <div className="Student">Fullname: {student.fullName} - Class: {student.class} </div>}
                <CImage/>
            </div>
        </div>
    )
}
