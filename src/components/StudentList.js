import React from 'react';
import {useState} from "react";
import {LS_NEW_STUDENTS, LS_STUDENT, LS_STUDENTS} from "../views/App";
import moment from "moment/moment";
import {SchoolName} from "../config/SearchLocalStorage";
import {useNavigate} from "react-router-dom";

export function StudentsList(){
    const navigate = useNavigate();

    const [students] = useState(JSON.parse(localStorage.getItem(LS_STUDENTS)));
    const [newStudents] = useState(JSON.parse(localStorage.getItem(LS_NEW_STUDENTS)));

    function StudentsFromFirebase() {
        if (students.length > 0) {
            return <>
                <h1>Students from school roster</h1>
                <TableConstruction theadData={Object.keys(students[0])} tbodyData={students}/>
            </>;
        }
        return <div/>;
    }

    function NewStudents() {
        if (newStudents.length > 0) {
            return <>
                <h1>New students from this session</h1>
                <TableConstruction theadData={Object.keys(newStudents[0])} tbodyData={newStudents}/>
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
                            case "fullName":   return <th key={"fullName"}>Full name</th>;
                            case "dob":   return <th key={"dob"}>DOB</th>;
                            case "class":   return <th key={"class"}>Class</th>;
                            case "idSchool":   return <th style={{width: "20%"}} key={"idSchool"}>School</th>;
                            case "localIdSchool":   return <th key={"idSchool"}>School</th>;
                            default: return <></>}
                    })}
                    <th>Date of last test</th>
                    <th>Last  VAR</th>
                    <th>Last  VAL</th>
                    <th  style={{width: "10%"}} key={"button"}> </th>
                </tr>
                </thead>
                <tbody>
                {tbodyData.map((row, index) => {
                    return <tr key={index}>
                        {theadData.map((key, index) => {
                            switch(key) {
                                case "fullName":   return  <td key={index}>{row[key]}</td>;
                                case "dob": return <td key={index}>{moment(row[key]).format('DD MMMM yyyy')}</td>;
                                case "class":   return  <td key={index}>{row[key]}</td>;
                                case "idSchool":   return <td style={{width: "20%"}} key={index}>{SchoolName(row)}</td>
                                case "localIdSchool":   return <td key={index}>{SchoolName(row)}</td>
                                default: return <></>}
                        })}
                        <td>{moment(Date.now()).format('DD MMMM yyyy')}</td>
                        <td style={{width: "10%"}}>0.55</td>
                        <td style={{width: "10%"}}>1</td>
                        <td  style={{width: "10%"}}><button className="btn btn-primary"
                                                            onClick={() => {
                                                                localStorage.setItem(LS_STUDENT, JSON.stringify(row));
                                                                navigate('/studentForm');
                                                            }}>
                           Let's play</button></td>
                    </tr>;
                })}
                </tbody>
            </table>
            </div>
        );
    }

    return(
        <div>
            <StudentsFromFirebase/>
            <NewStudents/>
        </div>
    )
}