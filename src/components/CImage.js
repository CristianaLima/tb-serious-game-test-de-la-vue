import React, {useEffect, useState} from "react";
import {
    LS_C_SELECTED,
    LS_CURRENT_THERAPIST,
    LS_NEW_VISUALSTESTS,
    LS_STUDENT,
    MAXREP
} from "../views/App";
import c from "../assets/c_picture.png";

/**
 *
 * response: stock tour and angle given by the controller screen
 * answer: true or false depend on real angle and the response
 * angleArray : list of angle calculated at beginning
 * angle : actual angle of C displayed
 * size : actual size of C displayed
 * status : 0 = not begins, 1 = begins, 2 = finish
 * results : array of size
 */
export function CImage(){
    const [angleArray] =  constructAngleArray();

    const [response, setResponse] = useState({tour : 0, angle : 0});
    const [answer, setAnswer] = useState(false);
    const [angle, setAngle] = useState(angleArray[0]);
    const [size, setSize] = useState(1);
    const [status, setStatus] = useState(0);
    const [results, setResults] = useState([]);
    const [newTests, setNewTests] = useState(() => {
        return JSON.parse(localStorage.getItem(LS_NEW_VISUALSTESTS)) || []
    });
    
    useEffect(() => {
        localStorage.setItem(LS_NEW_VISUALSTESTS, JSON.stringify(newTests));
    }, [newTests]);

    /**
     * Add a listener on local storage
     * Stock the new value in response
     */
    useEffect(() => {
        localStorage.setItem(LS_C_SELECTED, JSON.stringify({tour: 1, angle:-1}))
        window.dispatchEvent(new Event("storage"));
        window.addEventListener("storage", e =>{
                // Get info from local storage
                setResponse(JSON.parse(localStorage.getItem(LS_C_SELECTED)))
            }
        );
    }, []);

    /**
     * Each time response is changed, this use effect can
     * - do nothing if first tour
     * - set result if test is finish
     * - change size and angle of next C on other case
     */
    useEffect(() => {
        switch (response.tour){
            case 0 :
                break;
            case MAXREP :
                setStatus(2);
                console.log(results);
                setNewTests([...newTests, {
                    dateTest: Date.now(),
                    comprehension: false,
                    correction: false,
                    idStudent: JSON.parse(localStorage.getItem(LS_STUDENT)).id,
                    localIdStudent: JSON.parse(localStorage.getItem(LS_STUDENT)).localId,
                    idTherapist: JSON.parse(localStorage.getItem(LS_CURRENT_THERAPIST)).id,
                    rounds: 1,
                    vaLe: results[results.length-1],
                    vaRe: results[results.length-1]
                }])
                setSize(0); // C disappear
                break;
            default :{
                // Test begins
                setStatus(1);

                setResults(results => [...results, size])

                //Change size of C depend on answer correctness
                if(response.angle == angleArray[response.tour-1]){ // not "==="
                    setAnswer(true)
                    if(size<0.5)
                        setSize(size / 1.4);
                    else
                        setSize(size / 1.8);
                }
                else{
                    setAnswer(false)
                    if(size<1) {
                        setSize(size * 1.8);
                    }
                }

                // Rotate C
                setAngle(angleArray[response.tour])
            }
        }
    },[response]);


    /**
     * Constructing an array with equal part of each angle.
     * Then shuffle it until there isn't two identical values in a row
     */
    function constructAngleArray(){
        let array = [];
        //Constructing
        for (let i = 0; i < MAXREP; i++) {
            switch (i%4){
                case 0 : array.push(0);
                    break;
                case 1 : array.push(90);
                    break;
                case 2 : array.push(180);
                    break;
                case 3 : array.push(270);
                    break;
                default : array.push(-1)
            }
        }

        //Shuffling
        let result = false;

        while(result === false){
            result = true;
            array.sort(() => Math.random() - 0.5);

            for (let i = 1; i < array.length; i++) {
                if(array[i] === array[i-1]){
                    result = false;
                }
            }
        }
        return array
    }

    return (
        <div>
            {status<=1 ?
                <>
                    <img
                        id="image"
                        className="carteImg"
                        alt="C landolt"
                        src={c}
                        style={{
                            width: `${size*100}px` ,
                            transform: `rotate(${angle}deg)`,
                            position: 'absolute', left: '47%', top: '50%',
                    }}
                    />
                    {status === 0 ? "" : <div>Last answer was {answer.toString()}</div>}
                </>
                :  <div>Test Finish with result {results[results.length-1]}</div>}
        </div>
    );
}

export default CImage