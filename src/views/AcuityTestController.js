import {Button} from "reactstrap";
import React, {useEffect, useState} from 'react';
import c from "../assets/c_picture.png";
import {LS_C_SELECTED, MAXREP} from "./App";
import '../css/Button.css';
import {Button} from "reactstrap";

export function AcuityTestController(){
    const [tour, setTour] = useState(0)
    const [display,setDisplay]=useState(true) // enable to click on the button after answer

    const [active0, setActive0] = useState(true);
    const [active90, setActive90] = useState(true);
    const [active180, setActive180] = useState(true);
    const [active270, setActive270] = useState(true);

    useEffect(()=>
        {
            load();
        }
        ,[])

    /**
     * Add the value of C orienation in local storage
     * @param e
     */

    function C_selected (e) {
        switch (e) {
            case '0': {
                setActive0(!active0);
                setActive90(true);
                setActive180(true);
                setActive270(true);
                setTimeout(() => {
                    setActive0(active0);
                }, 1000);
                break;
            }
            case '90': {
                setActive90(!active90);
                setActive0(true);
                setActive180(true);
                setActive270(true);
                setTimeout(() => {
                    setActive90(active90);
                }, 1000);
                break;
            }
            case '180': {
                setActive180(!active180);
                setActive0(true);
                setActive90(true);
                setActive270(true);
                setTimeout(() => {
                    setActive180(active180);
                }, 1000);
                break;
            }
            case '270': {
                setActive270(!active270);
                setActive0(true);
                setActive90(true);
                setActive180(true);
                setTimeout(() => {
                    setActive270(active270);
                }, 1000);
                break;
            }
            default: {
                break;
            }
        }

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
            {tour === MAXREP ? <div><p>Test finish</p></div> : <>
                <br/>
                    <Button className={"btn-space_TOP"} onClick={() => {C_selected("0")}}  disabled={display}
                            style={{backgroundColor: active0?  "#6C757D" : "green"}}>
                        <img width="250"
                             style={{transform: "rotate(0deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 0°"
                        />
                    </Button>
                    <Button className="btn-space_TOP" onClick={() => {C_selected("90")}} disabled={display}
                            style={{backgroundColor: active90?  "#6C757D" : "green"}}>
                        <img width="250"
                             style={{transform: "rotate(90deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 90°"
                        />
                    </Button>

                <br/>

                    <Button className="btn-space_BOT" onClick={() => {C_selected("180")}} disabled={display}
                            style={{backgroundColor: active180?  "#6C757D" : "green"}}>
                        <img width="250"
                             style={{transform: "rotate(180deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 180°"
                        />
                    </Button >
                    <Button className="btn-space_BOT" onClick={() => {C_selected("270")}} disabled={display}
                            style={{backgroundColor: active270?  "#6C757D" : "green"}}>
                        <img width="250"
                             style={{transform: "rotate(270deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 270°"
                        />
                    </Button>

            </> }
        </>
    );
}