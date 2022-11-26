import React, {useEffect, useState} from 'react';
import {LS_STUDENT, LS_SCHOOLS, LS_NEW_STUDENTS} from "./App";
import {useNavigate} from "react-router-dom";
import {NavBar} from "../components/NavBar";
import moment from "moment/moment";

export default StudentForm;

/**
 * Form which allow to start a test with a student not on list charged
 */
function StudentForm() {
    const navigate = useNavigate();

    const [newStudents, setNewStudents] = useState(() => {
        return JSON.parse(localStorage.getItem(LS_NEW_STUDENTS));
    });
    const [schools] = useState(JSON.parse(localStorage.getItem(LS_SCHOOLS)));
    const [student, setStudent] = useState(() => {
        return JSON.parse(localStorage.getItem(LS_STUDENT));
    });

    /**
     * Update local storage each time new students gets updated
     */
    useEffect(() => {
            localStorage.setItem(LS_NEW_STUDENTS, JSON.stringify(newStudents));
    }, [newStudents]);

    /**
     * Update local storage each time student gets updated
     */
    useEffect(() => {
        localStorage.setItem(LS_STUDENT, JSON.stringify(student));
        }, [student]);

    /**
     * Handle submition of the form
     * @param e
     */
    function handleSubmit(e) {
        e.preventDefault(); // prevents browser refresh
        if (student.id === undefined) {
            addStudentToArray(student)
        }
        window.open('/acuityTestScreen', '_self')
        window.open('/acuityTestController', '_blank');
    }

    /**
     * Add student in array of students if not already in
     * @param student
     */
    function addStudentToArray(student) {
        const exist = newStudents.some(c => (c.localId === student.localId));
        if (exist===false && !newStudents.includes(student)){
            setNewStudents([...newStudents, student]);
        }
    }

    /**
     *  Handle change in form
     */
    function handleChangeSchool(e) {
        setStudent({...student, idSchool: e.target.value })
    }
    function handleChangeFullName(e) {
        setStudent({...student, fullName: e.target.value })
    }
    function handleChangeClass(e) {
        setStudent({...student, class: e.target.value })
    }
    function handleChangeDateOfBirth(e) {
        setStudent({...student, dob: e.target.value })
    }

    return (
        <>
            <NavBar/>
            <div  className="px-3 m-auto w-75 my-2">
                <button type="button" className="btn btn-danger btn-lg m-5"
                        onClick={() => navigate('/startGame')}>
                    Back to student list
                </button>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="school">School</label>
                        <select disabled={student.id !== undefined} className="form-control" id="school" onChange={handleChangeSchool}>
                            {schools.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullName">Full name</label>
                        <input disabled={student.id !== undefined} required id="fullName" type="text" className="form-control" value={student.fullName} onChange={handleChangeFullName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="class">Class</label>
                        <input disabled={student.id !== undefined} required id="class" type="text" className="form-control" value={student.class} onChange={handleChangeClass} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of birth</label>
                        {/* need format YYYY-MM-DD, display depends on browser language*/}
                        <input disabled={student.id !== undefined} required id="dob" type="date" className="form-control"  value={moment(student.dob).format('YYYY-MM-DD')} onChange={handleChangeDateOfBirth} />
                    </div>
                    <button type="submit" className="btn btn-primary">Let's play</button>
                </form>
            </div>
        </>
    );
}