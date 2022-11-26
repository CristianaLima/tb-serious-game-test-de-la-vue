import React  from "react";
import {NavBar} from "../components/NavBar";
import {Row} from "reactstrap";
import {ResultsList} from "../components/ResultsList";

export function ViewResults() {

    return (
        <>
            <NavBar/>
            <div className="m-auto w-75 my-2">
                <Row className="row-cols-lg-auto g-3 align-items-center"
                     style={{ display: "flex", justifyContent: "end", alignItems: "flex-end"}}>
                    <button type="button" className="btn btn-primary">
                        Export
                    </button>
                </Row>
                <ResultsList/>
            </div>
        </>
    )
}