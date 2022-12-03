import React, {useEffect} from 'react';
import {useState} from "react";
import {LS_NEW_STUDENTS, LS_STUDENT, LS_STUDENTS} from "../views/App";
import {getLastResultFromLS, getSchoolNameFromLS} from "../config/SearchLocalStorage";
import {useNavigate} from "react-router-dom";
import {Table} from "reactstrap";
import moment from "moment";

export function StudentsList(){
    const navigate = useNavigate();
    const [students] = useState(JSON.parse(localStorage.getItem(LS_STUDENTS)));
    const [newStudents] = useState(JSON.parse(localStorage.getItem(LS_NEW_STUDENTS)));
    const [studentsFiltered, setStudentsFiltered] = useState(filterStudents());
    const [newStudentsFiltered, setNewStudentsFiltered] = useState(filterNewStudents());
    const [filterSchool, setFilterSchool] = useState("");
    const [filterClass, setFilterClass] = useState("");
    const [filterFullName, setFilterFullName] = useState("");

    function filterStudents(){
        return students.map((student) => {
            const result = getLastResultFromLS(student);
            return ({
                'id': student.id,
                'fullName': student.fullName,
                'dob': student.dob,
                'class': student.class,
                'schoolName': getSchoolNameFromLS(student),
                'dateTest': result.dateTest === "-" ? result.dateTest : moment(result.dateTest).format('YYYY-MM-DD h:mm a'),
                'vaRe': result.vaRe === "-" ? result.vaRe : Math.round(result.vaRe * 100) / 100,
                'vaLe': result.vaRe === "-" ? result.vaLe : Math.round(result.vaRe * 100) / 100
            })
        })
    }

    function filterNewStudents(){
        return newStudents.map((student) => {
            const result = getLastResultFromLS(student);
            return ({
            'localId': student.localId,
            'fullName': student.fullName,
            'dob': student.dob,
            'class': student.class,
            'schoolName': getSchoolNameFromLS(student),
            'dateTest': result.dateTest === "-" ? result.dateTest : moment(result.dateTest).format('YYYY-MM-DD h:mm a'),
            'vaRe': result.vaRe === "-" ? result.vaRe : (Math.round(result.vaRe * 100) / 100),
            'vaLe': result.vaRe === "-" ? result.vaLe : (Math.round(result.vaRe * 100) / 100)
        })
    })
    }

    /**
     * Refresh search each time search inputs change
     */
    useEffect(() => {
        setStudentsFiltered(filterStudents()
            .filter(s => (s.schoolName).toUpperCase().includes(filterSchool.toUpperCase()))
            .filter(s => (s.class).toUpperCase().includes(filterClass.toUpperCase()))
            .filter(s => (s.fullName).toUpperCase().includes(filterFullName.toUpperCase())));
        setNewStudentsFiltered(filterNewStudents()
            .filter(s => (s.schoolName).toUpperCase().includes(filterSchool.toUpperCase()))
            .filter(s => (s.class).toUpperCase().includes(filterClass.toUpperCase()))
            .filter(s => (s.fullName).toUpperCase().includes(filterFullName.toUpperCase())));
    }, [filterSchool, filterClass, filterFullName]);

    /**
     * First array with students in database
     */
    function StudentsFromFirebase() {
        if (students.length > 0) {
            return  <div id="studentsFromFirebase">
                <h1>Students from school roster</h1>
                <StudentTable tbodyData={studentsFiltered}></StudentTable>
            </div>;
        }
        return <div/>;
    }

    /**
     * Second array with students created on the navigator
     */
    function NewStudents() {
        if (newStudents.length > 0) {
            return <div id="newStudents">
                <h1>New students from this session</h1>
                <StudentTable tbodyData={newStudentsFiltered}></StudentTable>
            </div>;
        }
        return <div/>;
    }

    function StudentTable({tbodyData}) {
        return (
            <div>
                <Table size="sm" hover>
                <thead>
                    <tr>
                        <th style={{width: "20%"}} key={"fullName"}>Fullname</th>
                        <th style={{width: "10%"}} key={"dob"}>DOB</th>
                        <th style={{width: "10%"}} key={"class"}>Class</th>
                        <th style={{width: "20%"}} key={"schoolName"}>School</th>
                        <th style={{width: "15%"}} key={"dateTest"}>Date</th>
                        <th key={"vaRe"}>vaRe</th>
                        <th key={"vaLe"}>vaLe</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tbodyData.map((item, index) => {
                        return (
                            <tr key={index} onClick={() => {
                                localStorage.setItem(LS_STUDENT, JSON.stringify(item));
                                navigate('/studentForm');
                            }}>
                                {Object.values(item).map((value, index) => {
                                    switch(index) {
                                        case 0: return <></>;
                                        default: return <td key={index}>{value}</td>}
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        );
    }

    return(
        <>
            <label>
                School:
                <input type="text" className="m-3" id="inputSearchSchool" placeholder="Search..."
                       onChange={(e) => {setFilterSchool(e.target.value)}}></input>
            </label>
            <label>
                Class :
                <input type="text" className="m-3" id="inputSearchClass" placeholder="Search..."
                       onChange={(e) => {setFilterClass(e.target.value)}}>
                </input>
            </label>
            <label>
                Fullname :
                <input type="text" className="m-3" id="inputSearchFullName" placeholder="Search..."
                       onChange={(e) => {setFilterFullName(e.target.value)}}>
                </input>
            </label>
            <StudentsFromFirebase/>
            <NewStudents/>
        </>
    )
}
