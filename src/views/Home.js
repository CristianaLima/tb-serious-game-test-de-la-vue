import React, {useEffect} from "react";
import {NavBar} from "../components/NavBar";
import {useNavigate} from "react-router-dom";
import {stockDataInLocalStorage} from "../config/synchroFirebase";

export function Home(){
    const navigate = useNavigate();

    useEffect(() => {
        //TODO: ask Océane for method
        //getTherapistById("X6ITtB97ZhCqf4Uw3yhH").then(t => localStorage.setItem(LS_CURRENT_THERAPIST, JSON.stringify(t)));

        stockDataInLocalStorage();
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