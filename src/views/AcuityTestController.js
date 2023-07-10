import React, {useEffect, useState} from 'react';
import {LS_C_SELECTED, MAXREP} from "./App";
import "../css/ChooseCharac.css";
import EtoileJaune from "../assets/EtoileCJaune.png";
import EtoileVert from "../assets/EtoileCVert.png";

export default AcuityTestController;

/**
 * The page ./acuityTestController display 4 buttons to response
 *
 * tour : number of response given
 * mousePosList: all position of click
 * lockedDisplay : if true, enable to click on the button,
 * windowDimensions : dimension of the windows to adapt button
 * CClicked : value of angle of last button double-clicked
 *
 */
function AcuityTestController() {
    const [tour, setTour] = useState(0);
    const [mousePosList, setMouseList] = useState([]);
    const [lockedDisplay, setLockedDisplay] = useState(true);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [CClicked, setCClicked] = useState('-1');

    /**
     * When the page loads, the buttons are disabled, a listener is set on the window size to be responsive
     */
    useEffect(() => {
        blockClick();

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /**
     * Each time CClicked changes, it triggers the timer. After 1 second, the CClicked is deselected
     */
    useEffect(() => {
        const timer = setTimeout(() => setCClicked('-1'), 1000);
        return () => clearTimeout(timer);
    }, [CClicked]);

    /**
     * Each time a click is made, the position is displayed in the browser console.
     * TODO: to be used for further implementation
     */
    useEffect(() => {
        if (mousePosList.length > 0) {
            console.log("Tour " + tour + " : X: " + mousePosList[mousePosList.length - 1].x + "   Y: " + mousePosList[mousePosList.length - 1].y)
        }
    }, [mousePosList]);


    /**
     * Get the windows size
     * @returns {{width: number, height: number}}
     */
    function getWindowDimensions() {
        const {innerWidth: width, innerHeight: height} = window;
        return {
            width,
            height
        };
    }

    /**
     * Position handling (MH) : Function to track cursor on click in the div
     * If a click occur outside the buttons, reset the CClicked variable
     */
    function handleMouseClickLocal(event) {
        setMouseList([...mousePosList, {
            x: event.clientX - event.currentTarget.offsetLeft,
            y: event.clientY - event.currentTarget.offsetTop
        }]);
        if (event.target.className === "btns-background") {
            setCClicked('-1');
        }
    }

    /**
     * Call each time a button is pressed
     * if the click occurs on the same button a new round is launched
     * if not, set CClicked
     * @param e
     */
    function C_selected(e) {
        if (CClicked === e) {
            startNewRound(e);
        } else {
            setCClicked(e);
        }
    }

    /**
     * Add the value of C orientation in local storage
     * Initialise the next tour
     * All buttons cannot be pressed for 1 second
     * @param e
     */
    function startNewRound(e) {
        localStorage.setItem(LS_C_SELECTED, JSON.stringify({tour: tour + 1, angle: e}));
        setTour(tour + 1);
        blockClick();
    }

    /**
     * Creates a timer of 1 second, at the end the buttons are unlocked
     */
    function blockClick() {
        setLockedDisplay(true);
        setTimeout(() => {
            setLockedDisplay(false);
        }, 1000);
    }

    return (
        <>
            {tour === MAXREP ?
                <div  style={{
                    height: windowDimensions.height,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <h1>Visual acuity test completed</h1>
                </div>
                :
                <div className={"btns-background"}
                     style={{height: windowDimensions.height}}
                     onClick={e => handleMouseClickLocal(e)}>
                    <button className="btn-left" onClick={() => {
                        C_selected("0")
                    }} disabled={lockedDisplay}
                            style={{
                                margin: windowDimensions.height / 16,
                                height: windowDimensions.height / 2.5,
                                width: windowDimensions.height / 2.5,
                                padding:0,
                                // backgroundColor: CClicked === '0' ? "green" : "#6C757D"
                            }}>
                        <img style={{transform: "rotate(0deg)"}}
                             src={CClicked === '0' ? EtoileVert : EtoileJaune}
                             className="img-thumbnail"
                             alt="c 0°"
                        />
                    </button>
                    <button className="btn-right" onClick={() => {
                        C_selected("90")
                    }} disabled={lockedDisplay}
                            style={{
                                margin: windowDimensions.height / 16,
                                height: windowDimensions.height / 2.5,
                                width: windowDimensions.height / 2.5,
                                padding:0,
                                // backgroundImage: "url(${Etoile})",
                                // backgroundColor: CClicked === '90' ? "green" : "green"
                            }}>
                        <img style={{transform: "rotate(90deg)"}}
                             src={CClicked === '90' ? EtoileVert : EtoileJaune}
                             className="img-thumbnail"
                             alt="c 90°"
                        />
                    </button>
                    <button className="btn-left" onClick={() => {
                        C_selected("180")
                    }} disabled={lockedDisplay}
                            style={{
                                margin: windowDimensions.height / 16,
                                height: windowDimensions.height / 2.5,
                                width: windowDimensions.height / 2.5,
                                padding:0,
                                // backgroundColor: CClicked === '180' ? "green" : "#6C757D"
                            }}>
                        <img style={{transform: "rotate(180deg)"}}
                             src={CClicked === '180' ? EtoileVert : EtoileJaune}
                             className="img-thumbnail"
                             alt="c 180°"
                        />
                    </button>
                    <button className="btn-right" onClick={() => {
                        C_selected("270")
                    }} disabled={lockedDisplay}
                            style={{
                                margin: windowDimensions.height / 16,
                                height: windowDimensions.height / 2.5,
                                width: windowDimensions.height / 2.5,
                                padding:0,
                                // backgroundColor: CClicked === '270' ? "green" : "#6C757D"
                            }}>
                        <img style={{transform: "rotate(270deg)"}}
                             src={CClicked === '270' ? EtoileVert : EtoileJaune}
                             className="img-thumbnail"
                             alt="c 270°"
                        />
                    </button>
                </div>
            }
        </>
    );
}