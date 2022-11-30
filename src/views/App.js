import React from 'react';
import '../css/App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./Home";
import {AcuityTestScreen} from "./AcuityTestScreen";
import {AcuityTestController} from "./AcuityTestController";
import StudentForm from "./StudentForm";
import {StartGame} from "./StartGame";
import {ViewResults} from "./ViewResults";

// Constants for local storage
export const LS_SCHOOLS = "schools";
export const LS_NEW_SCHOOLS = "newSchools";
export const LS_STUDENTS = "students";
export const LS_NEW_STUDENTS = "newStudents";
export const LS_RESULTS = "results";
export const LS_NEW_RESULTS = "newResults";
export const LS_STUDENT = "student";
export const LS_CURRENT_THERAPIST = "currentTherapist";
export const LS_C_SELECTED = "Cselected";
export const SS_WEAR_GLASSES = "wearGlasses";
export const MAXREP = 8;

function App() {

 return (
     <div className="App">
         <Routes>
             <Route path="/" element={<Home />}/>
             <Route path="/viewResults" element={<ViewResults />}/>
             <Route path="/startGame" element={<StartGame />}/>
             <Route path="/studentForm" element={<StudentForm />}/>
             <Route path="/acuityTestController" element={<AcuityTestController />}/>
             <Route path="/acuityTestScreen" element={<AcuityTestScreen />}/>
         </Routes>
     </div>
 );
}

export default App;
