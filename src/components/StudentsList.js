import React from 'react';
import {useState} from "react";
import {LS_NEW_STUDENTS, LS_STUDENT, LS_STUDENTS} from "../views/App";
import {SchoolName} from "../config/SearchLocalStorage";
import {useNavigate} from "react-router-dom";
import moment from "moment";


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

    //TODO un boutton "addFilter" qui permet de mettre un filtre sur autre chose que le nom
    //TODO design
    function myFunctionFilter(valeurInput) {

        // Declare variables
        let input, filter, tr, td, i, txtValue, newStudents,studentsFirebase;

        //récupère la valeur indiqué dans la barre de recherche
        input = document.getElementById("myInput")
        filter = input.value.toUpperCase();

        //fait le filtre sur le document
        studentsFirebase = document.getElementById("studentsFromFirebase");

        tr = studentsFirebase.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];

            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }

        newStudents = document.getElementById("newStudents");
        tr = newStudents.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
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
                <table className="table" id="filterTab">
                <thead >
                <tr>
                    {theadData.map(heading => {
                        switch(heading) {
                            case "fullName":   return <th key={"fullName"}>Full name </th>;
                            case "dob":   return <th key={"dob"}>DOB</th>;
                            case "class":   return <th key={"class"}>Class</th>;
                            case "idSchool":   return <th style={{width: "20%"}} key={"idSchool"}>School</th>;
                            case "localIdSchool":   return <th key={"localIdSchool"}>School</th>;
                            default: return}
                    })}
                    <th key={"dateTest"}>Date of last test</th>
                    <th key={"vaRe"}>Last  vaRe</th>
                    <th key={"vaLe"}>Last  vaLe</th>
                    <th key={"button"} style={{width: "10%"}}/>
                </tr>
                </thead>
                <tbody>
                {tbodyData.map((row, index) => {
                    return <tr key={index}>
                        {theadData.map((key, index) => {
                            switch(key) {
                                case "fullName":   return  <td key={index}>{row[key]}</td>;
                                case "dob": return <td key={index}>{row[key]}</td>;
                                case "class":   return  <td key={index}>{row[key]}</td>;
                                case "idSchool":   return <td style={{width: "20%"}} key={index}>{SchoolName(row)}</td>
                                case "localIdSchool":   return <td key={index}>{SchoolName(row)}</td>
                                default: return}
                        })}
                        <td key={"dateTest"} >TODO: {moment(Date.now()).format('YYYY-MM-DD')}</td>
                        <td key={"vaRe"} style={{width: "10%"}}>TODO</td>
                        <td key={"vaLe"} style={{width: "10%"}}>TODO</td>
                        <td key={"button"} style={{width: "10%"}}><button className="btn btn-primary"
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
            <input type="text" id="myInput" onKeyUp={myFunctionFilter()} placeholder="Search for names"
            ></input>

            <StudentsFromFirebase/>
            <NewStudents/>
        </div>
    )
}