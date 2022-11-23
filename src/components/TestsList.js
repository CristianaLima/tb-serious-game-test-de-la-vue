import React from 'react';
import {useState} from "react";
import {
    LS_NEW_VISUALSTESTS,
    LS_VISUALSTESTS
} from "../views/App";
import moment from "moment/moment";
import {SchoolName} from "../config/SearchLocalStorage";

export function TestsList(){
    const [tests] = useState(JSON.parse(localStorage.getItem(LS_VISUALSTESTS)));
    const [newTests] = useState(JSON.parse(localStorage.getItem(LS_NEW_VISUALSTESTS)));

    function TestsFromFirebase() {
        if (tests.length > 0) {
            return <>
                <h1>Tests in database</h1>
                <TableConstruction theadData={Object.keys(tests[0])} tbodyData={tests}/>
            </>;
        }
        return <div/>;
    }

    function NewTests() {
        if (newTests.length > 0) {
            return <>
                <h1>Tests not synchronise</h1>
                <TableConstruction theadData={Object.keys(newTests[0])} tbodyData={newTests}/>
            </>;
        }
        return <div/>;
    }

    function TableConstruction({theadData, tbodyData}) {
        return (
            <div>
                <input type="text" id="myInput" onKeyUp="myFunction()" placeholder="Search for..."
                       title="Type in a name"></input>
            <table className="table">
                <thead>
                <tr>
                    {theadData.map(heading => {
                        switch(heading) {
                            case "date":   return <th key={"dateTest"}>Date</th>;
                            case "vaRe":   return <th key={"vaRe"}>vaRe</th>;
                            case "vaLe":   return <th key={"vaRe"}>vaLe</th>;
                            case "dateTest":   return <></>;
                            case "student":   return  <>
                                <th key={"student"}>Fullname</th>
                                <th key={"student"}>DOB</th>
                                <th key={"student"}>Class</th>
                                <th key={"student"}>School</th>
                            </>;
                            default: return }
                    })}
                </tr>
                </thead>
                <tbody>
                {tbodyData.map((row, index) => {
                    return <tr key={index}>
                        {theadData.map((key, index) => {
                            switch(key) {
                                case "date": return <td key={index}>{moment(row[key]).format('DD MMMM yyyy')}</td>;
                                case "vaRe":   return <td key={index}>{row[key]}</td>;
                                case "vaLe":   return <td key={index}>{row[key]}</td>;
                                case "dateTest":   return <></>;
                                case "student":   return <>
                                    <td key={index}>{row[key].fullName}</td>
                                    <td key={index}>{row[key].dob}</td>
                                    <td key={index}>{row[key].class}</td>
                                    <td key={index}>{SchoolName(row[key])}</td>
                                </>;
                                default: return}
                        })}
                    </tr>;
                })}
                </tbody>
            </table>
            </div>
        );
    }

    return(
            <div>
                <TestsFromFirebase/>
                <NewTests/>
            </div>
    )
}