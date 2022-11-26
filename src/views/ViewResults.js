import React  from "react";
import {NavBar} from "../components/NavBar";
import {Row} from "reactstrap";
import {ResultsList} from "../components/ResultsList";

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