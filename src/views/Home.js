import React from "react";
import logo from "../logos/logo.svg";
import ChildForm from "../components/ChildForm";
import {NavBar} from "../components/NavBar";

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
                <ChildForm/>
            </header>
        </div>
            )
}