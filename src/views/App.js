import React, {useEffect, useState} from 'react';
import logo from '../logos/logo.svg';
import '../css/App.css';
import {Route, Routes} from "react-router-dom";
import {AcuityTestScreen} from "./AcuityTestScreen";
import {AcuityTestController} from "./AcuityTestController";
import {Home} from "./Home";

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
