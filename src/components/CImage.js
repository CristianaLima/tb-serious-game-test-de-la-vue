import React, {useEffect, useState} from "react";
import {
    LS_C_SELECTED,
    LS_CURRENT_THERAPIST,
    LS_NEW_VISUALSTESTS,
    LS_STUDENT,
    MAXREP
} from "../views/App";
import c from "../assets/c_picture.png";
import moment from "moment";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();
    const [angleArray] =  useState(()=> constructAngleArray());

    const [response, setResponse] = useState({tour : 0, angle : 0});
    const [answer, setAnswer] = useState(false);
    const [angle, setAngle] = useState(angleArray[0]);
    const [size, setSize] = useState(1);
    const [status, setStatus] = useState(0);
    const [results, setResults] = useState([]);
    const [newTests, setNewTests] = useState(() => {
        return JSON.parse(localStorage.getItem(LS_NEW_VISUALSTESTS));
    });

    useEffect(() => {
        localStorage.setItem(LS_NEW_VISUALSTESTS, JSON.stringify(newTests));
    }, [newTests]);

    /**
     * Add a listener on local storage
     * Stock the new value in response
     */
    useEffect(() => {
        window.dispatchEvent(new Event("storage"));
        window.addEventListener("storage", () =>{
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
                setNewTests([...newTests, {
                    idStudent: JSON.parse(localStorage.getItem(LS_STUDENT)).id,
                    localIdStudent: JSON.parse(localStorage.getItem(LS_STUDENT)).localId,
                    dateTest: moment(Date.now()).format('YYYY-MM-DD'),
                    correction: false,
                    comprehension: false,
                    rounds: 1,
                    vaRe: results[results.length-1],
                    vaLe: results[results.length-1],
                    idTherapist: JSON.parse(localStorage.getItem(LS_CURRENT_THERAPIST)).id,
                }])
                setSize(0); // C disappear
                break;
            default :{
                // Test begins
                setStatus(1);

                setResults(results => [...results, size])

                //Change size of C depend on answer correctness
                if(response.angle.toString() === angleArray[response.tour-1].toString()){ // not "==="
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
                </>
                :   <>
                    <button type="button" className="btn btn-danger btn-lg m-5"
                            onClick={() => navigate('/')}>
                        Back to home
                    </button>
                    <button onClick={() => navigate('/viewResults')}  type="button" className="btn btn-primary btn-lg m-5">
                        View results
                    </button>
                    <button onClick={() => navigate('/startGame')} type="button" className="btn btn-success btn-lg m-5">
                        Start game
                    </button>
                </>}
        </div>
    );
}

export default CImage