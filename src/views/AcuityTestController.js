import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup} from "reactstrap";
import c from "../assets/c_picture.png";
import {LS_C_SELECTED, MAXREP} from "./App";

export function AcuityTestController(){
    const [tour, setTour] = useState(0)
    const [display,setDisplay]=useState(true) // enable to click on the button after answer

    useEffect(()=>
        {
            load();
        }
    ,[])

    /**
     * Add the value of C orienation in local storage
     * @param e
     */
    function c_selected (e) {
        localStorage.setItem(LS_C_SELECTED, JSON.stringify({tour: tour + 1, angle: e}))
        setTour(tour + 1)
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
             {tour === MAXREP ? <div><p>Test finish</p></div> :
                <>
                <ButtonGroup>
                    <Button className="btn btn-secondary" onClick={() => {c_selected("0")}} disabled={display}>
                        <img width="250"
                             style={{transform: "rotate(0deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 0°"
                        />
                    </Button>
                    <Button className="btn btn-secondary" onClick={() => {c_selected("90")}} disabled={display}>
                        <img width="250"
                             style={{transform: "rotate(90deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 90°"
                        />
                    </Button>
                </ButtonGroup>
                <br/>
                <ButtonGroup>
                    <Button className="btn btn-secondary" onClick={() => {c_selected("180")}} disabled={display}>
                        <img width="250"
                             style={{transform: "rotate(180deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 180°"
                        />
                    </Button >
                    <Button className="btn btn-secondary" onClick={() => {c_selected("270")}} disabled={display}>
                        <img width="250"
                             style={{transform: "rotate(270deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 270°"
                        />
                    </Button>
                </ButtonGroup>
            </> }
        </>
    );
}