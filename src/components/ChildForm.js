import React, {useEffect, useState} from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
    collection,
    getDocs,
    getFirestore,
    query,
} from "firebase/firestore";

const LS_CHILD = "child";
const LS_CHILDREN = "children";
const firebaseConfig = {
    apiKey: "AIzaSyDjFinschyWco3_1oaoSc68aMHPa9hwCfY",
    authDomain: "fitnesscheck-4820e.firebaseapp.com",
    databaseURL: "https://fitnesscheck-4820e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fitnesscheck-4820e",
    storageBucket: "fitnesscheck-4820e.appspot.com",
    messagingSenderId: "234255121985",
    appId: "1:234255121985:web:7f891cba7d8633bf9410c0",
    measurementId: "G-7MJ39EHPTL"
};


function ChildForm() {
    const [children, setChildren] = useState([]);
    const [child, setChild] = useState({
        id: Math.round(Date.now() / 1000).toString(),
        firstname: "",
        lastname: "",
        dateOfBirth: ""
    });
    const [networkColor, setNetworkColor] = useState("red");

    useEffect(() => {
        const storageChildren = JSON.parse(localStorage.getItem(LS_CHILDREN));
        if (storageChildren) {
            setChildren(storageChildren);
        }
        getTest();
    }, []);

    useEffect(() => {
        // fires when todos array gets updated
        localStorage.setItem(LS_CHILDREN, JSON.stringify(children));
    }, [children]);

    function handleChangeFirstname(e) {
        setChild({...child, firstname: e.target.value })
    }
    function handleChangeLastname(e) {
        setChild({...child, lastname: e.target.value })
    }
    function handleChangeDateOfBirth(e) {
        setChild({...child, dateOfBirth: e.target.value })
    }

    function addChild(child) {
            const exist = children.some(c => (c.id === child.id ));
            if (exist===false && !children.includes(child)){
                setChildren([...children, child]);
            }
    }

    async function getTest(){
        setNetworkColor("red")
        const firebaseApp = firebase.initializeApp(firebaseConfig);
        const db = getFirestore();
        let formCollection = await getDocs(query(collection(db, "test")));
        let formArray = formCollection.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            formRef: doc.ref
        }))
        if (formArray.length>0){
            setNetworkColor("green")
            synchronise()
            setChildren([]);
        }
    }

    function handleSubmit(e) {
        setChild({...child, id: Math.round(Date.now() / 1000).toString() })
        localStorage.setItem(LS_CHILD, JSON.stringify(child));
        addChild(child);

        e.preventDefault(); // prevents browser refresh
        setChild({
            id: Math.round(Date.now() / 1000).toString(),
            firstname: "",
            lastname: "",
            dateOfBirth: ""
        });

        getTest();
    }

    function synchronise() {
        //TODO
        console.log("synchornise")
    }

    function DataToSynchronise() {
        const getHeadings = () => {
            return Object.keys(children[0]);
        }
        if (children.length > 0) {
            return <Table theadData={getHeadings()} tbodyData={children}/>
        }
        return <div/>;
    }

    return ( <div>

            <form onSubmit={handleSubmit}>
                <div id='inputs'>
                    <label>
                        Firstname
                        <input type="text" value={child.firstname} onChange={handleChangeFirstname} />
                    </label>
                    <label>
                        Lastname
                        <input type="text" value={child.lastname} onChange={handleChangeLastname} />
                    </label>
                    <label>
                        Date of birth
                        <input type="date" value={child.dateOfBirth} onChange={handleChangeDateOfBirth} />
                    </label>
                    <input type="submit" value="Submit" />
                </div>

            </form>
            <svg height="30" width="30">
                <circle cx="20" cy="20" r="10" fill={networkColor} />
            </svg>
            <DataToSynchronise></DataToSynchronise>
    </div>

    );
}

export default ChildForm;



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
                        return <td key={row[key]}>{row[key]}</td>
                    })}
                </tr>;
            })}
            </tbody>
        </table>
    );
}
