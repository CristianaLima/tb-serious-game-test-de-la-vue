import React from "react";
import {useEffect} from "react";
import {LS_STUDENT} from "../views/App";
import {useState} from "react";

export function StudentsTable({theadData, tbodyData}) {
    //TODO: complete for selection button
    /*const [student, setStudent] = useState({
        id: "",
        fullName: "",
        class: "",
        dob: "",
        idSchool: ""
    });
    useEffect(() => {
        localStorage.setItem(LS_STUDENT, JSON.stringify(student));
    }, [student]);*/

    return (
        <table className="table">
            <thead>
            <tr>
                {theadData.map(heading => {
                    return <th key={heading}>{heading}</th>
                })}
            </tr>
            </thead>
            <tbody>
            {tbodyData.map((row, index) => {
                return <tr key={index}>
                    {theadData.map((key, index) => {
                        return <td key={index}>{row[key]}</td>
                    })}
                    <td><button className="btn btn-outline-primary"
                                onClick={() => {
                                    /*getStudentById(row["id"]).then(r => setStudent(
                                        {fullName: r.fullName, dob: r.dob, class: r.class, idSchool: r.idSchool }))*/
                                }}>
                        Select this student TODO</button></td>
                </tr>;
            })}

            </tbody>
        </table>
    );
}