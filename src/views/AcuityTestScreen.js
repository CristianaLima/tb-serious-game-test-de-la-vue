import React, {useState,useEffect} from 'react';
import {NavBar} from "../components/NavBar";
import SizeImage from "../components/SizeImage";

export function AcuityTestScreen(){
const axe = 400
    return(
        <div>
            <NavBar/>
            <h1>Test screen</h1>
            <SizeImage axe={axe}/>
        </div>
    )
}
