import React from 'react';
import '../css/App.css';
import {Route, Routes} from "react-router-dom";
import {AcuityTestScreen} from "./AcuityTestScreen";
import {AcuityTestController} from "./AcuityTestController";
import {Home} from "./Home";

// Constants for local storage
export const LS_SCHOOLS = "schools";
export const LS_STUDENTS = "students";
export const LS_TESTS = "visualTest";
export const LS_NEW_STUDENTS = "newStudents";
export const LS_STUDENT = "student";

function App() {

 return (
     <div className="App">
         <Routes>
             <Route path="/" element={<Home />}/>
             <Route path="/acuityTestController" element={<AcuityTestController />}/>
             <Route path="/acuityTestScreen" element={<AcuityTestScreen />}/>
         </Routes>
     </div>
 );
}

export default App;
