import React, {useEffect, useState} from 'react';
import {LS_STUDENT, LS_SCHOOLS, LS_NEW_STUDENTS} from "../views/App";

export default StudentForm;

/**
 * Form which allow to start a test with a student not on list charged
 */
function StudentForm() {
    const [newStudents, setNewStudents] = useState(() => {
        return JSON.parse(localStorage.getItem(LS_NEW_STUDENTS));
    });
    const [schools] = useState(JSON.parse(localStorage.getItem(LS_SCHOOLS)));
    const [student, setStudent] = useState({
        localId: Math.round(Date.now() / 1000).toString(),
        fullName: "",
        dob: "",
        class: "",
        idSchool: schools[0].id
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
        addStudentToArray(student)
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
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="school">School</label>
                    <select className="form-control" id="school" onChange={handleChangeSchool}>
                        {schools.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="fullName">Full name</label>
                    <input required id="fullName" type="text"  className="form-control" value={student.fullName} onChange={handleChangeFullName} />
                </div>
                <div className="form-group">
                    <label htmlFor="class">Class</label>
                    <input required id="class" type="text"  className="form-control" value={student.class} onChange={handleChangeClass} />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of birth</label>
                    <input required id="dob" type="date"  className="form-control" value={student.dob} onChange={handleChangeDateOfBirth} />
                </div>
                <button type="submit" className="btn btn-primary">Let's play</button>
            </form>
    </div>
    );
}