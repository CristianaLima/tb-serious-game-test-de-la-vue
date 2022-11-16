import React, {useEffect, useState} from 'react';
import {Button} from "reactstrap";
import c from "../assets/c_picture.png";
import {LS_C_SELECTED, MAXREP} from "./App";
import '../css/Button.css';

export function AcuityTestController(){
    const [tour, setTour] = useState(0)
    const [mousePosList, setMouseList] = useState([])
    const [display,setDisplay]=useState(true) // enable to click on the button after answer

    //Storage button value and add a colour to the selective buttons
    const [CClicked, setCClicked] = useState('-1');

    /**
     * Position handling (MH) :
     * Function to track cursor on click in the div.
     * The data is stored in an array and can be use later
     */
    function handleMouseClickLocal(event) {
        setMouseList([...mousePosList,{ x: event.clientX - event.currentTarget.offsetLeft, y: event.clientY - event.currentTarget.offsetTop }])

        //If a click occur outside of the buttons, reset the CClicked variable
        if(event.target.className === "andiv"){
            setCClicked('-1');
        }
    }

    useEffect(() => {
        load();
    }, []);

    /**
     * CClicked stock button selected and after 1s the value returns to -1
     * @param e
     */
    function C_selected (e) {

        /**
         * This is a way to reset the timer and avoid problem when changing button.
         * Couldn't implement this simple thing with React sorcery...
         * MH
         */
        //clearTimeout();

        if(CClicked === e){
            newRound(e);
        }else {
            setCClicked(e);

            setTimeout(() => {
                setCClicked('-1');
            }, 1000);
        }
    }

    /**
     * Add the value of C orientation in local storage.
     * @param e
     */
    function newRound(e){
        localStorage.setItem(LS_C_SELECTED, JSON.stringify({tour: tour+1, angle:e}))
        setTour(tour+1);
        setDisplay(true);
        load();
    }
    /**
     * Load Function is to wait before we can click for the second test
     */
    function load(){
        setTimeout(() => {
            console.log('Timer!')
            setDisplay(false);
        }, 1000);
    }

    return (
        <>
            {tour === MAXREP ? <div><p>Test finish</p></div> : <div className={"andiv"} onClick={e => handleMouseClickLocal(e)}>
                    <Button className={"btn-space_TOP"} onClick={() => {C_selected("0")}}  disabled={display}
                            style={{backgroundColor: CClicked==='0'?   "green" : "#6C757D"}}>
                        <img width="250"
                             style={{transform: "rotate(0deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 0°"
                        />
                    </Button>
                    <Button className="btn-space_TOP" onClick={() => {C_selected("90")}} disabled={display}
                            style={{backgroundColor: CClicked==='90'?  "green" : "#6C757D" }}>
                        <img width="250"
                             style={{transform: "rotate(90deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 90°"
                        />
                    </Button>

                <br/>

                    <Button className="btn-space_BOT" onClick={() => {C_selected("180")}} disabled={display}
                            style={{backgroundColor: CClicked==='180'?  "green" : "#6C757D"}}>
                        <img width="250"
                             style={{transform: "rotate(180deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 180°"
                        />
                    </Button >
                    <Button className="btn-space_BOT" onClick={() => {C_selected("270")}} disabled={display}
                            style={{backgroundColor: CClicked==='270'?  "green" : "#6C757D"}}>
                        <img width="250"
                             style={{transform: "rotate(270deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 270°"
                        />
                    </Button>

            </div>
            }
        </>
    );
}