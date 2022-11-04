import React, {useEffect, useState} from "react";
import {LS_C_SELECTED,  MAXREP} from "../views/App";
import c from "../assets/c_picture.png";

/**
 *
 * response: stock tour and angle given by the controller screen
 * answer: true or false depend of real angle and the response
 * angleArray: list of angle p
 */
export function SizeImage(){
    const [response, setResponse] = useState({tour : 0, angle : 0}) //
    const [answer, setAnswer] = useState(false);
    const [angleArray] = useState(() => constructAngleArray())
    const [rotation, setRotation] = useState(angleArray[0]);
    const [size, setSize] = useState(100);
    const [result, setResult] = useState(0);//0 = not begins, 1 = begins, other = [last size, result of the test]

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
                setResult(size) // Last size is result
                setSize(0); //C disappear
                break;
            default :{
                // Test begins
                setResult(1)

                //Change size of C depend on answer correctness
                if(response.angle == angleArray[response.tour-1]){
                    setAnswer(true)
                    if(size<50)
                        setSize(size /1.4);
                    else
                        setSize(size /1.8)
                }
                else{
                    setAnswer(false)
                    if(size<100) {
                        setSize(size * 1.8)
                    }
                }

                // Rotate C
                setRotation(angleArray[response.tour])
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
            {result<=1 ?
                <>
                    <img
                        id="image"
                        className="carteImg"
                        alt="C landolt"
                        src={c}
                        style={{ width: `${size}px` ,transform: `rotate(${rotation}deg)`}}
                    />
                    {result === 0 ? "" : <div>Last answer was {answer.toString()}</div>}
                </>
                :  <div>Test Finish with result {Math.round(result)}</div>}
        </div>
    );
}

export default SizeImage