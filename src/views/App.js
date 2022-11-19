import React from 'react';
import '../css/App.css';
import {Route, Routes} from "react-router-dom";
import {AcuityTestScreen} from "./AcuityTestScreen";
import {AcuityTestController} from "./AcuityTestController";
import {Mockup} from "./Mockup";
import {StartGame} from "./StartGame";
import {TestResult} from "./TestsResult";

// Constants for local storage
export const LS_SCHOOLS = "schools";
export const LS_NEW_SCHOOLS = "newSchools";
export const LS_STUDENTS = "students";
export const LS_NEW_STUDENTS = "newStudents";
export const LS_VISUALSTESTS = "visualTest";
export const LS_NEW_VISUALSTESTS = "newVisualTests";
export const LS_STUDENT = "student";
export const LS_CURRENT_THERAPIST = "currentTherapist";
export const LS_C_SELECTED = "Cselected";
export const MAXREP = 8;

function App() {

 return (
     <div className="App">
         <Routes>
             <Route path="/" element={<Mockup />}/>
             <Route path="/startGame" element={<StartGame />}/>
             <Route path="/testResults" element={<TestResult />}/>
             <Route path="/acuityTestController" element={<AcuityTestController />}/>
             <Route path="/acuityTestScreen" element={<AcuityTestScreen />}/>
         </Routes>
     </div>
 );
}

export default App;
