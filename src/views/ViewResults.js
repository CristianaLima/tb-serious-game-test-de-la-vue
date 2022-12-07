import React from "react";
import {NavBar} from "../components/NavBar";
import {ResultsList} from "../components/ResultsList";

/**
 * The page ./viewResults display the navbar and the list of visual acuity test results
 */
export function ViewResults() {
    return (
        <>
            <NavBar/>
            <div className="m-auto w-75 my-2">
                <ResultsList/>
            </div>
        </>
    )
}