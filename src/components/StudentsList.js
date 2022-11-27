import React from 'react';
import {useState} from "react";
import {LS_NEW_STUDENTS, LS_STUDENT, LS_STUDENTS} from "../views/App";
import {getSchoolNameFromLS} from "../config/SearchLocalStorage";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {Table} from "reactstrap";

export function StudentsList(){
    const navigate = useNavigate();

    const [students] = useState(JSON.parse(localStorage.getItem(LS_STUDENTS)));
    const [newStudents] = useState(JSON.parse(localStorage.getItem(LS_NEW_STUDENTS)));

    function StudentsFromFirebase() {
        if (students.length > 0) {
            return  <div id="studentsFromFirebase">
                <h1>Students from school roster</h1>
                <TableConstruction theadData={Object.keys(students[0])} tbodyData={students}/>
            </div>;
        }
        return <div/>;
    }

    function NewStudents() {
        if (newStudents.length > 0) {
            return <div id="newStudents">
                <h1>New students from this session</h1>
                <TableConstruction theadData={Object.keys(newStudents[0])} tbodyData={newStudents}/>
            </div>;
        }
        return <div/>;
    }
    //TODO design
    function selectColumnToFilter(columnToFilter) {

        switch(columnToFilter){
            case 'fullName':
                ColumnFilter("studentsFromFirebase",2,document.getElementById("InputFullName"))
                ColumnFilter("newStudents",2,document.getElementById("InputFullName"))
                break;
            case 'class':
                ColumnFilter("studentsFromFirebase",1,document.getElementById("InputClass"))
                ColumnFilter("newStudents",1,document.getElementById("InputClass"))
                break;
            case 'school':
                ColumnFilter("studentsFromFirebase",0,document.getElementById("InputSchool"))
                ColumnFilter("newStudents",0,document.getElementById("InputSchool"))
                break;
            default:
                break;
        }
    }

    function ColumnFilter(table, columnNumberToFilter, input) {
        const inputUpperCase = input.value.toUpperCase();

        const studentsFirebase = document.getElementById(table);
        const tr = studentsFirebase.getElementsByTagName("tr");

        for (let i = 0; i < tr.length; i++) {
            const td = tr[i].getElementsByTagName("td")[columnNumberToFilter];

            if (td) {
                const txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(inputUpperCase) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }

    }

    function TableConstruction({theadData, tbodyData}) {
        return (
            <div>
                <Table size="sm" hover>
                    <thead>
                    <tr>
                        {theadData.map(heading => {
                            switch(heading) {
                                case "fullName":   return <th style={{width: "20%"}} key={"fullName"}>Full name</th>;
                                case "dob":   return <th style={{width: "10%"}} key={"dob"}>DOB</th>;
                                case "class":   return <th style={{width: "10%"}} key={"class"}>Class</th>;
                                case "idSchool":   return <th style={{width: "20%"}} key={"idSchool"}>School</th>;
                                case "localIdSchool":   return <th style={{width: "20%"}} key={"localIdSchool"}>School</th>;
                                default: return}
                        })}
                        <th key={"dateTest"} style={{width: "10%"}}>Date of last test</th>
                        <th key={"vaRe"}>Last  vaRe</th>
                        <th key={"vaLe"}>Last  vaLe</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tbodyData.map((row, index) => {
                        return <tr key={index} onClick={() => {
                            localStorage.setItem(LS_STUDENT, JSON.stringify(row));
                            navigate('/studentForm');
                        }}>
                            {theadData.map((key, index) => {
                                switch(key) {
                                    case "fullName":   return  <td style={{width: "20%"}} key={index}>{row[key]}</td>;
                                    case "dob": return <td style={{width: "10%"}} key={index}>{row[key]}</td>;
                                    case "class":   return  <td style={{width: "10%"}} key={index}>{row[key]}</td>;
                                    case "idSchool":   return <td style={{width: "20%"}} key={index}>{getSchoolNameFromLS(row)}</td>
                                    case "localIdSchool":   return <td style={{width: "20%"}} key={index}>{getSchoolNameFromLS(row)}</td>
                                    default: return}
                            })}
                            <td key={"dateTest"} style={{width: "10%"}} >TODO: {moment(Date.now()).format('YYYY-MM-DD')}</td>
                            <td key={"vaRe"} >TODO</td>
                            <td key={"vaLe"} >TODO</td>
                        </tr>;
                    })}
                    </tbody>
                </Table>
            </div>

        );
    }

    return(

        <div>
            <label> Search fullName : </label>
            <input type="text" id="InputFullName" className="m-3" onKeyUp={() => {selectColumnToFilter("fullName")}}
                   placeholder="Search for fullName"
            ></input>
            <label>  class : </label>
            <input type="text" id="InputClass" className="m-3" onKeyUp={() => {selectColumnToFilter("class")}}
                   placeholder="Search for class"
            ></input>
            <label> school : </label>
            <input type="text" id="InputSchool" className="m-3" onKeyUp={() => {selectColumnToFilter("school")}}
                   placeholder="Search for school"
            ></input>

            <StudentsFromFirebase/>
            <NewStudents/>
        </div>
    )
}