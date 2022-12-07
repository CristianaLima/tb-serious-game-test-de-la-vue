import React from "react";
import NavBar from "../components/NavBar";
import ResultsList from "../components/ResultsList";

export default ViewResults;
/**
 * The page ./viewResults display the navbar and the list of visual acuity test results
 */
function ViewResults() {
    return (
        <>
            <NavBar/>
            <div className="m-auto w-75 my-2">
                <ResultsList/>
            </div>
        </>
    )
}