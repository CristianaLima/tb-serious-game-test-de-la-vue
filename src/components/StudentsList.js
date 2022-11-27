import React, {useEffect} from 'react';
import {useState} from "react";
import {LS_NEW_STUDENTS, LS_STUDENT, LS_STUDENTS} from "../views/App";
import {getSchoolNameFromLS} from "../config/SearchLocalStorage";
import {useNavigate} from "react-router-dom";
import moment from "moment";

export function StudentsList(){
    const navigate = useNavigate();

    const [students] = useState(JSON.parse(localStorage.getItem(LS_STUDENTS)));
    const [newStudents] = useState(JSON.parse(localStorage.getItem(LS_NEW_STUDENTS)));
    const [searchRadio, setSearchRadio] = useState("school")

    useEffect(() => {
        let inputSearch = document.getElementById("inputSearch");
        selectColumnToFilter(inputSearch.value)
    }, [searchRadio]);


    function handleChangeRadioButton(value) {
        setSearchRadio(value);
    }


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
    function selectColumnToFilter(input) {

        switch(searchRadio){
            case 'school':
                ColumnFilter("studentsFromFirebase",0, input);
                ColumnFilter("newStudents",0, input);
                break;
            case 'class':
                ColumnFilter("studentsFromFirebase",1, input);
                ColumnFilter("newStudents",1, input);
                break;
            case 'fullName':
                ColumnFilter("studentsFromFirebase",2, input);
                ColumnFilter("newStudents",2, input);
                break;
            default:
                break;
        }
    }

    function ColumnFilter(table, columnNumberToFilter, input) {
        let i, td, txtValue, filter;

        filter = input.toUpperCase();

        let tableById = document.getElementById(table);
        let tr = tableById.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[columnNumberToFilter];

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
                    <th key={"button"} style={{width: "10%"}}/>
                </tr>
                </thead>
                <tbody>
                {tbodyData.map((row, index) => {
                    return <tr key={index}>
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
        <>
            <label>Search school, class, full name : </label>
            <input type="text" className="m-3" id="inputSearch" onChange={(e) => {selectColumnToFilter( e.target.value)}}
                   placeholder="Search..."
            ></input>
            <input type="radio" checked={searchRadio === 'school'} className="m-1" value="school" name="search" onChange={(e)=>handleChangeRadioButton(e.target.value)}/> School
            <input type="radio" className="m-1" value="class" name="search" onChange={(e)=>handleChangeRadioButton(e.target.value)} /> Class
            <input type="radio" className="m-1" value="fullName" name="search" onChange={(e)=>handleChangeRadioButton(e.target.value)}/> FullName
            <StudentsFromFirebase/>
            <NewStudents/>
        </>
    )
}