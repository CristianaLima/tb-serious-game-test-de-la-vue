import React from 'react';
import '../css/App.css';
import logo from '../logos/logo.svg'
import StudentForm from "../components/StudentForm";

function App() {

 return (
   <div className="App">
     <header className="App-header">

       <img src={logo} className="App-logo" alt="logo" />
       <p>
         Edit <code>src/App.js</code> and save to reload.
       </p>
       <a
         className="App-link"
         href="https://reactjs.org"
         target="_blank"
         rel="noopener noreferrer"
       >
         Learn React
       </a>
       <StudentForm/>
     </header>
   </div>
 );
}

export default App;
