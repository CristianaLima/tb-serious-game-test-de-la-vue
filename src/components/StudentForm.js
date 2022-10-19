import React, {useEffect, useState} from 'react';
import {addStudent, getSchoolById} from "../config/InitFirebase";
import {LS_STUDENT, LS_SCHOOLS, LS_NEW_STUDENTS} from "../views/App";
import {useNavigate} from "react-router-dom";

export default StudentForm;

function StudentForm() {
    const [newStudents, setNewStudents] = useState([]);
    const [schools] = useState(JSON.parse(localStorage.getItem(LS_SCHOOLS)));
    const [student, setStudent] = useState({
        id: "", //Math.round(Date.now() / 1000).toString(),
        fullName: "",
        class: "",
        dob: "",
        idSchool: ""
    });
    const navigate = useNavigate();
    //const [networkColor, setNetworkColor] = useState("red");
    //const [isOnline, setNetwork] = useState(window.navigator.onLine);

    useEffect( () => {
        setStudent({...student, idSchool: schools[0].id})
    }, []);

    // Register the event listeners of navigator statut (online)
    /*useEffect(() => {
        window.addEventListener('offline', setOffline);
        window.addEventListener('online', setOnline);
        // Cleanup if we unmount
        return () => {
            window.removeEventListener('offline', setOffline);
            window.removeEventListener('online', setOnline);
        }
    }, []);*/

    // Initialize array of student il local storage (TODO: check)
   useEffect(() => {
        const storageStudents = JSON.parse(localStorage.getItem(LS_NEW_STUDENTS));
        if (storageStudents) {
            setNewStudents(storageStudents);
        }
    }, []);

    // Update local storage each time students gets updated
    /*useEffect(() => {
            localStorage.setItem(LS_NEW_STUDENTS, JSON.stringify(newStudents));
    }, [newStudents]);*/

    // Update local storage each time students gets updated
    useEffect(() => {
        localStorage.setItem(LS_STUDENT, JSON.stringify(student));
    }, [student]);

    // Handle submition of the form
    function handleSubmit(e) {
        e.preventDefault(); // prevents browser refresh
        //setStudent({...student, id: Math.round(Date.now() / 1000).toString() })
            getSchoolById(student.idSchool).then(s => {
                let studentToPush = {
                    fullName: student.fullName,
                    class: student.class,
                    dob: student.dob,
                    idSchool: s.ref
                };
                addStudent(studentToPush).then((r)=>{
                    setStudent({...student, id: r.id })
                });
            })

            addStudentToArray(student);
            localStorage.setItem(LS_NEW_STUDENTS, JSON.stringify(newStudents)); // TODO: why always one late ?

        window.open('/acuityTestScreen', '_self')
        window.open('/acuityTestController', '_blank');
    }

    // Add student in array of students if not already in
    function addStudentToArray(student) {
        /*const exist = students.some(c => (c.id === student.id ));
        if (exist===false && !students.includes(student)){
            setStudents([...students, student]);
        }*/
        setNewStudents([...newStudents, student]);
    }

    // For check connection
    /*const setOnline = () => {
        setNetwork(true);
        setNetworkColor("green");
        console.log("setOnline");
        synchronise();
    };
    const setOffline = () => {
        setNetwork(false);
        setNetworkColor("red");
        console.log("setOffline");
    };*/

    // Handle change in form
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

    /*function synchronise() {
        console.log("synchronise");
        console.log(newStudents);
        const storageStudents = JSON.parse(localStorage.getItem(LS_NEW_STUDENTS));
        if (storageStudents) {
            setNewStudents(storageStudents);
        }
        for (let i = 0; i < newStudents.length; i++) {
            console.log(newStudents[i].fullName)
            //addStudentFirebase(s).then(r => console.log("synchronise"));
        }
        //setNewStudents([]);
    }*/

    // Array of students visible in page
    /*function DataToSynchronise() {
        const getHeadings = () => {
            return Object.keys(newStudents[0]);
        }
        if (newStudents.length > 0) {
            return <div>
                <p>DATA SEND TO FIRESTORE IN THIS SESSION </p>
                <StudentsTable listOfStudents={newStudents}/>
            </div> }
        return <div/>;
    }*/

    return (
        <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="school">School</label>
                        <select className="form-control" id="school" onChange={handleChangeSchool}>
                            {schools.map((school) => (
                                <option key={school.id} value={school.id}>{school.name}</option>
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
/*
<svg height="30" width="30">
    <circle cx="20" cy="20" r="10" fill={networkColor} />
</svg>
                <DataToSynchronise/>
*/


