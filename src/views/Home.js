import React from "react";
import {NavBar} from "../components/NavBar";
import {NavLink} from "reactstrap";

export function Home(){
    return(

        <div className="Home">
            <NavBar></NavBar>
            <div className="px-3 m-auto w-75 my-2 text-center">
                <button type="button" className="btn btn-primary btn-lg m-5">Results</button>
                <button type="button" className="btn btn-success btn-lg m-5"  >
                    <NavLink href = "acuityTestScreen">
                    New Test
                    </NavLink>
                </button>
                <button type="button" className="btn btn-danger btn-lg m-5">Exit</button>
            </div>
        </div>
            )
}