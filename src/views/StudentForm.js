import React, {useEffect, useState} from 'react';
import {LS_NEW_STUDENTS, LS_SCHOOLS, LS_STUDENT, SS_WEAR_GLASSES} from "./App";
import {useNavigate} from "react-router-dom";
import {NavBar} from "../components/NavBar";
import moment from "moment/moment";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default StudentForm;

/**
 * Form which allow to start a test with a student not on list charged
 */
function StudentForm() {
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
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
     * Handle submission of the form
     * @param e
     */
    function handleSubmit(e) {
        e.preventDefault(); // prevents browser refresh
        toggleModal();
    }

    /**
     * After modal (wearGlasses) response, stock student in new_students list if it's new
     * Then go to test screen
     * @param wearGlasses
     */
    function startGame(wearGlasses){
        if (student.id === undefined && student.localId === undefined) {
            setStudent({...student,  localId: Math.round(Date.now() / 1000).toString()});
            addStudentToArray({...student,  localId: Math.round(Date.now() / 1000).toString()})
        }
        sessionStorage.setItem(SS_WEAR_GLASSES, wearGlasses);
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
                <h1>{student.id !== undefined || student.localId !== undefined ? "Ready?" : "New student" }</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="school">School</label>
                        <select disabled={student.id !== undefined || student.localId !== undefined} className="form-control" id="school" onChange={handleChangeSchool}>
                            {schools.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullName">Full name</label>
                        <input disabled={student.id !== undefined || student.localId !== undefined} required id="fullName" type="text" className="form-control" value={student.fullName} onChange={handleChangeFullName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="class">Class</label>
                        <input disabled={student.id !== undefined || student.localId !== undefined} required id="class" type="text" className="form-control" value={student.class} onChange={handleChangeClass} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of birth</label>
                        {/* need format YYYY-MM-DD, display depends on browser language*/}
                        <input disabled={student.id !== undefined || student.localId !== undefined} required id="dob" type="date" className="form-control"  value={student.dob === "" ? "" : moment(student.dob).format('YYYY-MM-DD')} onChange={handleChangeDateOfBirth} />
                    </div>
                    <Button className="m-5" color="danger" onClick={() => navigate('/startGame')}>
                        Back to student list
                    </Button>
                    <Button className="m-5" color="primary" type="submit">Let's play</Button>
                </form>
                <Modal centered={true} isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>
                        Correction
                    </ModalHeader>
                    <ModalBody>Does the patient wear prescription glasses?</ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={()=>startGame(true)}>
                            Yes
                        </Button>
                        <Button color="danger" onClick={()=>startGame(false)}>
                            No
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}