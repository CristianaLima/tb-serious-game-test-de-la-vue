import React from "react";
import {NavBar} from "../components/NavBar";
import { useNavigate } from "react-router-dom"


export function Mockup(){
    const navigate = useNavigate()

    return(
        <div className="Home">
            <NavBar/>
            <div className="px-3 m-auto w-75 my-2 text-center">
                <h1>Welcome [Therapeute name]</h1>
                <button onClick={() => navigate('/testResults')}  type="button" className="btn btn-primary btn-lg m-5">
                    View results
                </button>
                <button onClick={() => navigate('/startGame')} type="button" className="btn btn-success btn-lg m-5">
                    Start game
                </button>
            </div>
        </div>
            )
}