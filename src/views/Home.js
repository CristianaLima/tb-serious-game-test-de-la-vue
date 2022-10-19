import React, {useEffect} from "react";
import {NavBar} from "../components/NavBar";
import {getAllSchools, getAllStudents, getAllTests} from "../config/InitFirebase";
import {LS_SCHOOLS, LS_STUDENTS, LS_TESTS} from "./App";
import {useNavigate} from "react-router-dom";

export function Home(){
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            getAllSchools().then(s => localStorage.setItem(LS_SCHOOLS, JSON.stringify(s)));
            getAllStudents().then(s => localStorage.setItem(LS_STUDENTS, JSON.stringify(s)));
            getAllTests().then(s => localStorage.setItem(LS_TESTS, JSON.stringify(s)));
        }
        fetchData();
    }, []);

    return(

        <div className="Home">
            <NavBar/>
            <div className="px-3 m-auto w-75 my-2 text-center">
                <button type="button" className="btn btn-primary btn-lg m-5">Results TODO</button>
                <button type="button" className="btn btn-success btn-lg m-5"  onClick={() => {navigate("/studentFormScreen")}}>
                    New Test
                </button>
            </div>
        </div>
            )
}