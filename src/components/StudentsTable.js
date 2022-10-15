import {getStudentById} from "../config/InitFirebase";
import React from "react";

export function StudentsTable({theadData, tbodyData}) {
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
                    <td><button className="btn btn-outline-primary"  onClick={() => {
                        getStudentById(row["id"]).then(r => console.log(r));
                    }}>TODO: select this student</button></td>
                </tr>;
            })}

            </tbody>
        </table>
    );
}