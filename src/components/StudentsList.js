import React, {useEffect, useState} from 'react';
import {LS_NEW_STUDENTS, LS_STUDENT, LS_STUDENTS} from "../views/App";
import {getLastResultFromLS, getSchoolNameFromLS} from "../config/SearchLocalStorage";
import {useNavigate} from "react-router-dom";
import {Table} from "reactstrap";
import moment from "moment";

export default StudentsList;
/**
 * Show 2 table: one with students in LS_STUDENTS, the other with LS_NEW_STUDENTS
 *
 * navigate : to move from one page to another
 * students : raw data from LS_STUDENTS (with id of the attached data)
 * newStudents : raw data from LS_NEW_STUDENTS (with id of the attached data)
 * studentsCompleted : students map with string data
 * newStudentsCompleted : newStudents map with string data
 * filterSchool : contains the character string typed by the user in "School search" field
 * filterClass : contains the character string typed by the user in "Class search" field
 * filterFullName : contains the character string typed by the user in "Fullname search" field
 * studentsFiltered : data from studentsCompleted after the filters (school, class, fullname) applied
 * newStudentsFiltered : data from newStudentsCompleted after the filters (school, class, fullname) applied
 */
function StudentsList(){
    const navigate = useNavigate();
    const [students] = useState(JSON.parse(localStorage.getItem(LS_STUDENTS)));
    const [newStudents] = useState(JSON.parse(localStorage.getItem(LS_NEW_STUDENTS)));
    const studentsCompleted = students.map((student) => {
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
    });
    const newStudentsCompleted = newStudents.map((student) => {
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
    const [filterSchool, setFilterSchool] = useState("");
    const [filterClass, setFilterClass] = useState("");
    const [filterFullName, setFilterFullName] = useState("");
    const [studentsFiltered, setStudentsFiltered] = useState(studentsCompleted);
    const [newStudentsFiltered, setNewStudentsFiltered] = useState(newStudentsCompleted);

    /**
     * Refreshes filteredResults and newStudentsFiltered each time a user types in one of the search fields
     */
    useEffect(() => {
        setStudentsFiltered(studentsCompleted
            .filter(s => (s.schoolName).toUpperCase().includes(filterSchool.toUpperCase()))
            .filter(s => (s.class).toUpperCase().includes(filterClass.toUpperCase()))
            .filter(s => (s.fullName).toUpperCase().includes(filterFullName.toUpperCase())));
        setNewStudentsFiltered(newStudentsCompleted
            .filter(s => (s.schoolName).toUpperCase().includes(filterSchool.toUpperCase()))
            .filter(s => (s.class).toUpperCase().includes(filterClass.toUpperCase()))
            .filter(s => (s.fullName).toUpperCase().includes(filterFullName.toUpperCase())));
    }, [filterSchool, filterClass, filterFullName]);

    /**
     * First array with students in database
     */
    function StudentsFromFirebase() {
        if (students.length > 0) {
            return  <>
                <h3>Students from school roster</h3>
                <StudentTable tbodyData={studentsFiltered}></StudentTable>
            </>;
        }
    }

    /**
     * Second array with students created on this navigator
     */
    function NewStudents() {
        if (newStudents.length > 0) {
            return <>
                <h3>New students from this session</h3>
                <StudentTable tbodyData={newStudentsFiltered}></StudentTable>
            </>;
        }
    }

    /**
     * Construction of a html table to show 7 columns :
     * Student's fullname, student's date of birth (DOB), student's class, school's name,
     * date of last test, last value Right eyes, last value Left eyes (if available)
     * @param tbodyData
     */
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
                                        case 0: return;
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

    /**
     * Show two tables of students with 3 search fields if there is data
     * If not (in both), indicates "No student"
     */
    return(
        <>
            <h1>Students</h1>
            {students.length === 0 && newStudents.length === 0 ?
                <p>No student</p>
                :
                <>
                    <label>
                        School:
                        <input type="text" className="m-3" placeholder="Search..."
                               onChange={(e) => {setFilterSchool(e.target.value)}}></input>
                    </label>
                    <label>
                        Class :
                        <input type="text" className="m-3" placeholder="Search..."
                               onChange={(e) => {setFilterClass(e.target.value)}}>
                        </input>
                    </label>
                    <label>
                        Fullname :
                        <input type="text" className="m-3" placeholder="Search..."
                               onChange={(e) => {setFilterFullName(e.target.value)}}>
                        </input>
                    </label>
                    <StudentsFromFirebase/>
                    <NewStudents/>
                </>
            }
        </>
    )
}
