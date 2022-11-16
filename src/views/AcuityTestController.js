import React, {useEffect, useState} from 'react';
import {Button} from "reactstrap";
import c from "../assets/c_picture.png";
import {LS_C_SELECTED, MAXREP} from "./App";

export function AcuityTestController(){
    const [tour, setTour] = useState(0);
    const [mousePosList, setMouseList] = useState([]);
    const [lockedDisplay, setLockedDisplay]  =useState(true); // enable to click on the button after answer
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    //Storage button value (angle) and add a colour to the selective buttons
    const [CClicked, setCClicked] = useState('-1');

    useEffect(() => {
        blockClick(); // button locked when start
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    /**
     * Position handling (MH) :
     * Function to track cursor on click in the div.
     * The data is stored in an array and can be use later
     */
    function handleMouseClickLocal(event) {
        setMouseList([...mousePosList,{ x: event.clientX - event.currentTarget.offsetLeft, y: event.clientY - event.currentTarget.offsetTop }]);
        //If a click occur outside the buttons, reset the CClicked variable
        if(event.target.className === "btns-background"){
            setCClicked('-1');
        }
    }

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
        //TODO
        //clearTimeout();

        if(CClicked === e){
            startNewRound(e);
        } else {
            setCClicked(e);

            setTimeout(() => {
                setCClicked('-1');
            }, 5000);
        }
    }

    /**
     * Add the value of C orientation in local storage.
     * @param e
     */
    function startNewRound(e){
        localStorage.setItem(LS_C_SELECTED, JSON.stringify({tour: tour+1, angle:e}));
        setTour(tour+1);
        blockClick();
    }
    /**
     * Load Function is to wait before we can click for the second test
     */
    function blockClick(){
        setLockedDisplay(true);
        setTimeout(() => {
            console.log('Timer!');
            setLockedDisplay(false);
        }, 1000);
    }

    return (
        <>
            {tour === MAXREP ? <div><p>Test finish</p></div> : <div className={"btns-background"}
                                                                    style={{width: windowDimensions.height, height: windowDimensions.height,
                                                                        position: 'center', margin: 'auto', backgroundColor: '#282c34',
                                                                        display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}
                                                                    onClick={e => handleMouseClickLocal(e)}>
                <div style={{width: windowDimensions.height/8}}></div>
                <Button className={"btn-space_TOP"} onClick={() => {C_selected("0")}}  disabled={lockedDisplay}
                        style={{width: windowDimensions.height/4, backgroundColor: CClicked==='0'? "green" : "#6C757D"}}>
                    <img style={{transform: "rotate(0deg)"}}
                         src={c}
                         className="img-thumbnail"
                         alt="c 0°"
                    />
                </Button>
                <div style={{width: windowDimensions.height/4}}></div>
                <Button className="btn-space_TOP" onClick={() => {C_selected("90")}} disabled={lockedDisplay}
                        style={{width: windowDimensions.height/4, backgroundColor: CClicked==='90'? "green" : "grey" }}>
                    <img style={{transform: "rotate(90deg)"}}
                         src={c}
                         className="img-thumbnail"
                         alt="c 90°"
                    />
                </Button>
                <div style={{width: windowDimensions.height/8}}></div>
                <div style={{width: windowDimensions.height/8}}></div>
                <Button className="btn-space_BOT" onClick={() => {C_selected("180")}} disabled={lockedDisplay}
                        style={{width: windowDimensions.height/4, backgroundColor: CClicked==='180'?  "green" : "grey"}}>
                    <img style={{transform: "rotate(180deg)"}}
                         src={c}
                         className="img-thumbnail"
                         alt="c 180°"
                    />
                </Button >
                <div style={{width: windowDimensions.height/4}}></div>
                <Button className="btn-space_BOT" onClick={() => {C_selected("270")}} disabled={lockedDisplay}
                        style={{width: windowDimensions.height/4, backgroundColor: CClicked==='270'?  "green" : "grey"}}>
                    <img style={{transform: "rotate(270deg)"}}
                         src={c}
                         className="img-thumbnail"
                         alt="c 270°"
                    />
                </Button>
                <div style={{width: windowDimensions.height/8}}></div>
            </div>
            }
        </>
    );
}