import React  from "react";
import {NavBar} from "../components/NavBar";
import {Row} from "reactstrap";
import {TestList} from "../components/TestList";

export function TestResult(){

    return(
        <div >
            <NavBar/>
            <div  className="px-3 m-auto w-75 my-2">
                <Row className="row-cols-lg-auto g-3 align-items-center"  style={{display: "flex",
                    justifyContent: "end", alignItems: "flex-end"
                }}>
                    <button type="button" className="btn btn-primary">
                        Export
                    </button>
                </Row>
            </div>
            <TestList/>

        </div>
            )
}