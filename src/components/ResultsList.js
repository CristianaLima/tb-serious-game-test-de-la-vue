import React from 'react';
import {useState} from "react";
import {
    LS_NEW_VISUALSTESTS,
    LS_VISUALSTESTS
} from "../views/App";
import {getSchoolNameFromLS, getStudentFromLS} from "../config/SearchLocalStorage";

export function ResultsList(){
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
                <input type="text" id="myInput" placeholder="Search for..."
                       title="Type in a name"></input>
            <table className="table">
                <thead>
                <tr>
                    {theadData.map(heading => {
                        switch(heading) {
                            case "dateTest":   return <th key={"dateTest"}>Date</th>;
                            case "vaRe":   return <th key={"vaRe"}>vaRe</th>;
                            case "vaLe":   return <th key={"vaLe"}>vaLe</th>;
                            case "correction":   return <th key={"correction"}>Glasses </th>;
                            case "comprehension":   return <th key={"comprehension"}>Understood </th>;
                            case "rounds":   return <th key={"rounds"}>Rounds </th>;
                            //TODO: key warning is because of <>
                            case "idStudent":
                            case "localIdStudent":   return <>
                                <th key={"fullName"}>Fullname</th>
                                <th key={"dob"}>DOB</th>
                                <th key={"class"}>Class</th>
                                <th key={"schoolName"}>School</th>
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
                                case "dateTest": return <td key={index}>{row[key]}</td>;
                                case "vaRe":   return <td key={index}>{row[key]}</td>;
                                case "vaLe":   return <td key={index}>{row[key]}</td>;
                                case "correction":   return <td key={index}>{row[key].toString()}</td>;
                                case "comprehension":   return <td key={index}>{row[key].toString()}</td>;
                                case "rounds":   return <td key={index}>{row[key]}</td>;
                                case "idStudent":
                                case "localIdStudent": {
                                    const student = getStudentFromLS(row);
                                    return <>
                                        <td key={{index}+"fullName"}>{student.fullName}</td>
                                        <td key={{index}+"dob"}>{student.dob}</td>
                                        <td key={{index}+"class"}>{student.class}</td>
                                        <td key={{index}+"schoolName"}>{getSchoolNameFromLS(student)}</td>
                                    </>;
                                }
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