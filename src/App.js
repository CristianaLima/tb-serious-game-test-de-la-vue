import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ChildForm from "./components/ChildForm";
import {addStudent} from "./config/InitFirebase";

function App() {


    //Add Student
    async function handleSubmitAddStudent(e){
        e.preventDefault();
        const newStudent = {
            fullName: e.fullName,
        };
        console.log(e.value);
        await addStudent(newStudent)
    }

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
         <ChildForm/>
         <form onSubmit={handleSubmitAddStudent}>
             <label> Test connection </label> <br/>
             <input type = "text"/>
             <button type="submit"> save </button>
         </form>
     </header>
   </div>
 );
}

export default App;
