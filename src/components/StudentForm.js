import React, {useEffect, useState} from 'react';
import {addStudent, getAllStudents, getStudentById, simpleAddStudent,} from "../config/InitFirebase";

// Constantes for local storage
const LS_STUDENT = "student";
const LS_STUDENTS = "students";

export default StudentForm;

function StudentForm() {
    const [students, setStudents] = useState([]);
    const [studentsFromFirebase, setStudentsFromFirebase] = useState([]);
    const [student, setStudent] = useState({
        id: "", //Math.round(Date.now() / 1000).toString(),
        fullName: "",
        class: "",
        dob: ""
    });
    const [networkColor, setNetworkColor] = useState("red");
    const [isOnline, setNetwork] = useState(window.navigator.onLine);

    useEffect( () => {
        async function fetchData() {
            getAllStudents().then(s => setStudentsFromFirebase(s));
        }
        fetchData();
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
        const storageStudents = JSON.parse(localStorage.getItem(LS_STUDENTS));
        if (storageStudents) {
            setStudents(storageStudents);
        }
    }, []);

    // Update local storage each time students gets updated
    /*useEffect(() => {
            localStorage.setItem(LS_STUDENTS, JSON.stringify(students));
    }, [students]);*/

    // Update local storage each time students gets updated
    useEffect(() => {
        localStorage.setItem(LS_STUDENT, JSON.stringify(student));
    }, [student]);

    // Handle submition of the form
    function handleSubmit(e) {
        e.preventDefault(); // prevents browser refresh
        //setStudent({...student, id: Math.round(Date.now() / 1000).toString() })
        let studentToPush = {
            fullName: student.fullName,
            class: student.class,
            dob: student.dob
        }
        simpleAddStudent(studentToPush).then((r)=>{
            setStudent({...student, id: r.id })
        });
        addStudentToArray(student);
        localStorage.setItem(LS_STUDENTS, JSON.stringify(students)); // TODO: why always one late ?
        console.log(students)
    }

    // Add student in array of students if not already in
    function addStudentToArray(student) {
        /*const exist = students.some(c => (c.id === student.id ));
        if (exist===false && !students.includes(student)){
            setStudents([...students, student]);
        }*/
        setStudents([...students, student]);
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
                <p>DATA SEND TO FIRESTORE IN THIS SESSION </p>
                <Table theadData={getHeadings()} tbodyData={students}/>
            </div> }
        return <div/>;
    }

    function DataFromFirebase() {
        const getHeadings = () => {
            return Object.keys(studentsFromFirebase[0]);
        }
        if (studentsFromFirebase.length > 0) {
            return <div>
                <p>DATA IN FIRESTORE</p>
                <Table theadData={getHeadings()} tbodyData={studentsFromFirebase}/>
            </div> }
        return <div/>;
    }

    return (
        <div>
                <h3>NEW TEST: STUDENT INFO</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="school">School</label>
                        <select className="form-control" id="school">
                            <option>TODO</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullName">Full name</label>
                        <input id="fullName" type="text"  className="form-control" value={student.fullName} onChange={handleChangeFullName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="class">Class</label>
                        <input id="class" type="text"  className="form-control" value={student.class} onChange={handleChangeClass} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of birth</label>
                        <input id="dob" type="date"  className="form-control" value={student.dob} onChange={handleChangeDateOfBirth} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                <DataToSynchronise/>
                <DataFromFirebase/>
    </div>
    );
}
/*
<svg height="30" width="30">
    <circle cx="20" cy="20" r="10" fill={networkColor} />
</svg>
*/

function Table({theadData, tbodyData}) {
    return (
        <table className="table">
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
                    <button
                        onClick={() => {
                            getStudentById(row["id"]).then(r => console.log(r));
                        }}>
                        getData
                    </button>
                </tr>;
            })}

            </tbody>
        </table>
    );
}
