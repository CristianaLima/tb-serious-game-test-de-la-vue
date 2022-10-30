import React, {useEffect, useState} from 'react';
import {TestController} from "../components/TestController";

export function AcuityTestController(){
    const [testInProgress, setTestInProgress] = useState(true)

    useEffect(() => {
        window.addEventListener("storage", e =>{
                console.log("C SELECTED: " + e.newValue)
                if (e.newValue === "-1"){
                    setTestInProgress(false)
                }
            }
        );
    }, []);

    return (
        <>
            {testInProgress ?  <TestController/> : <div><p>Test finish</p></div>}
        </>
    );
}