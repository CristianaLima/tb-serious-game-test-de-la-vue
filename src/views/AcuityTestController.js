import React, {useEffect, useState} from 'react';
import {Button} from "reactstrap";
import c from "../assets/c_picture.png";
import {LS_C_SELECTED, MAXREP} from "./App";
import '../css/Button.css';
import {findByLabelText} from "@testing-library/react";

/**
 *Position handling (MH) :
 * Global positioning onClick via the useEffect who create an event listener (for the entire page)
 * Local positioning onClick via the const handlMouseClickLocal, who take the position of an element to set position only inside it
 * TODO : MH and OT need to work together for the right size of the buttons, then call the local positioning
 */
export function AcuityTestController(){
    const [tour, setTour] = useState(0)
    const [mousePos, setMousePos] = useState({});
    const [localMousePos, setLocalMousePos] = useState({});
    const [display,setDisplay]=useState(true) // enable to click on the button after answer

    const [active0, setActive0] = useState(false);
    const [active90, setActive90] = useState(false);
    const [active180, setActive180] = useState(false);
    const [active270, setActive270] = useState(false);

    const [click, setClick] = useState('-1')

    //Function to track cursor on click who depend on the element (call from render)
    const handleMouseClickLocal = (event) => {
        //  Get mouse position relative to element
        const localX = event.clientX - event.target.offsetLeft;
        const localY = event.clientY - event.target.offsetTop;

        setLocalMousePos({ x: localX, y: localY });
    };

    //Set a listener for the global positioning
    useEffect(() => {

        load();

        const handleMouseClick = (event) => {
            setMousePos({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('click', handleMouseClick);

        return () => {
            window.removeEventListener(
                'click',
                handleMouseClick
            );
        };


    }, []);
    /**
     * Add the value of C orienation in local storage
     * @param e
     */

    console.log(active0 +" 0")
    console.log(active90+ " 90")
    console.log("-----------------------")

   // console.log(active180)
   // console.log(active270)
    function C_selected (e) {





/*
        if(active0 == false || active90 == false || active180 == false || active270 == false){
            newRound();
        }

 */
        switch (e) {
            case '0': {

                if(active0){
                    newRound();
                }

                setActive0(true);
                setActive90(false);
                setActive180(false);
                setActive270(false);

                setTimeout(() => {
                    setActive0(false);
                }, 1000);

                break;

            }
            case '90': {
                if(active90){
                    newRound();
                }

                setActive0(false);
                setActive90(true);
                setActive180(false);
                setActive270(false);

                setTimeout(() => {
                    setActive90(false);
                }, 1000);



                break;
            }
            case '180': {
                setActive180(true);
                setActive0(false);
                setActive90(false);
                setActive270(false);
                setTimeout(() => {
                    setActive180(false);
                }, 1000);
                break;
            }
            case '270': {
                setActive270(true);
                setActive0(false);
                setActive90(false);
                setActive180(false);
                setTimeout(() => {
                    setActive270(false);
                }, 1000);
                break;
            }
            default: {
                break;
            }
        }

/*
        localStorage.setItem(LS_C_SELECTED, JSON.stringify({tour: tour+1, angle:e}))
        setTour(tour+1);
        setDisplay(true);
        load();
*/
        function newRound(){
            localStorage.setItem(LS_C_SELECTED, JSON.stringify({tour: tour+1, angle:e}))
            setTour(tour+1);
            setDisplay(true);
            load();
        }
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
            {tour === MAXREP ? <div><p>Test finish</p></div> : <div onClick={handleMouseClickLocal}>
                <br/>
                    <Button className={"btn-space_TOP"} onClick={() => {C_selected("0")}}  disabled={display}
                            style={{backgroundColor: !active0?  "#6C757D" : "green"}}>
                        <img width="250"
                             style={{transform: "rotate(0deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 0°"
                        />
                    </Button>
                    <Button className="btn-space_TOP" onClick={() => {C_selected("90")}} disabled={display}
                            style={{backgroundColor: !active90?  "#6C757D" : "green"}}>
                        <img width="250"
                             style={{transform: "rotate(90deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 90°"
                        />
                    </Button>

                <br/>

                    <Button className="btn-space_BOT" onClick={() => {C_selected("180")}} disabled={display}
                            style={{backgroundColor: !active180?  "#6C757D" : "green"}}>
                        <img width="250"
                             style={{transform: "rotate(180deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 180°"
                        />
                    </Button >
                    <Button className="btn-space_BOT" onClick={() => {C_selected("270")}} disabled={display}
                            style={{backgroundColor: !active270?  "#6C757D" : "green"}}>
                        <img width="250"
                             style={{transform: "rotate(270deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 270°"
                        />
                    </Button>

                <h1>{"Mouse coords : X:" + mousePos.x +" Y:" + mousePos.y}</h1>
                <h1>{"Local Mouse coords : X:" + localMousePos.x +" Y:" + localMousePos.y}</h1>
            </div> }
        </>
    );
}