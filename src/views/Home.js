import React from "react";
import logo from "../logos/logo.svg";
import {NavBar} from "../components/NavBar";
import StudentForm from "../components/StudentForm";

export function Home(){
    return(

        <div className="Home">
            <NavBar></NavBar>
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
            )
}