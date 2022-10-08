import React, {useEffect, useState} from 'react';
import {addStudentFirebase} from "../config/InitFirebase";

// Constantes for local storage
const LS_STUDENT = "student";
const LS_STUDENTS = "students";

export default StudentForm;

function StudentForm() {
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState({
        id: Math.round(Date.now() / 1000).toString(),
        fullName: "",
        class: "",
        dob: ""
    });
    const [networkColor, setNetworkColor] = useState("red");
    const [isOnline, setNetwork] = useState(window.navigator.onLine);

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
   /*useEffect(() => {
        const storageStudents = JSON.parse(localStorage.getItem(LS_STUDENTS));
        if (storageStudents) {
            setStudents(storageStudents);
        }
    }, []);*/

    // Update local storage each time students gets updated
    useEffect(() => {
        localStorage.setItem(LS_STUDENTS, JSON.stringify(students));
    }, [students]);

    // Handle submition of the form
    function handleSubmit(e) {
        e.preventDefault(); // prevents browser refresh
        setStudent({...student, id: Math.round(Date.now() / 1000).toString() })
        localStorage.setItem(LS_STUDENT, JSON.stringify(student));
        addStudentToArray(student);
        addStudentFirebase(student).then(r => console.log("send to firebase"));
        /*setStudent({
            id: Math.round(Date.now() / 1000).toString(),
            firstname: "",
            lastname: "",
            dateOfBirth: ""
        });*/
    }

    // Add student in array of students if not already in
    function addStudentToArray(student) {
        const exist = students.some(c => (c.id === student.id ));
        if (exist===false && !students.includes(student)){
            setStudents([...students, student]);
        }
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
        console.log(students);
        const storageStudents = JSON.parse(localStorage.getItem(LS_STUDENTS));
        if (storageStudents) {
            setStudents(storageStudents);
        }
        for (let i = 0; i < students.length; i++) {
            console.log(students[i].fullName)
            //addStudentFirebase(s).then(r => console.log("synchronise"));
        }
        //setStudents([]);
    }*/

    // Array of students visible in page
    function DataToSynchronise() {
        const getHeadings = () => {
            return Object.keys(students[0]);
        }
        if (students.length > 0) {
            return <div>
                <p>Data send to firestore in this session : </p>
                <Table theadData={getHeadings()} tbodyData={students}/>
            </div> }
        return <div/>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div id='inputs'>
                    <label>
                        fullName
                        <input id="fullName" type="text" value={student.fullName} onChange={handleChangeFullName} />
                    </label>
                    <label>
                        Class
                        <input id="class" type="text" value={student.class} onChange={handleChangeClass} />
                    </label>
                    <label>
                        Date of birth
                        <input id="dob" type="date" value={student.dob} onChange={handleChangeDateOfBirth} />
                    </label>
                    <input type="submit" value="Submit" />
                </div>

            </form>

            <svg height="30" width="30">
                <circle cx="20" cy="20" r="10" fill={networkColor} />
            </svg>

            <DataToSynchronise/>
    </div>
    );
}


function Table({theadData, tbodyData}) {
    return (
        <table>
            <thead>
            <tr>
                {theadData.map(heading => {
                    return <th key={heading}>{heading}</th>
                })}
            </tr>
            </thead>
            <tbody>
            {tbodyData.map((row, index) => {
                return <tr key={index}>
                    {theadData.map((key, index) => {
                        return <td key={index}>{row[key]}</td>
                    })}
                </tr>;
            })}
            </tbody>
        </table>
    );
}
