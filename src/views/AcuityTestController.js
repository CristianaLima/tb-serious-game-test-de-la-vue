import React, {useState} from 'react';
import c from "../assets/c_picture.png";
import {LS_C_SELECTED, MAXREP} from "./App";
import '../css/Button.css';
import {Button} from "reactstrap";

export function AcuityTestController(){

    const [tour, setTour] = useState(0)

    const [active, setActive] = useState(false);

    function c_selected (e) {
        setActive(!active);
        console.log(active);
        localStorage.setItem(LS_C_SELECTED, JSON.stringify({tour: tour+1, angle:e}))
        setTour(tour+1)


    }

    return (
        <>
            {tour === MAXREP ? <div><p>Test finish</p></div> : <>
                <br/>
                    <Button className={"btn-space_TOP"} onClick={() => {c_selected("0")}}
                            style={{backgroundColor: active? "white" : "grey"}}>

                        <img width="250"
                             style={{transform: "rotate(0deg)"}}
                             style={{backgroundColor: active? "black" : "white"}}
                             src={c}
                            // className= {active ? "btn-space_TOP-Green" : "img-thumbnail"}
                             //className="img-thumbnail"
                             alt="c 0°"
                        />
                    </Button>
                    <Button className="btn-space_TOP" onClick={() => {c_selected("90")}}>
                        <img width="250"
                             style={{transform: "rotate(90deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 90°"
                        />
                    </Button>

                <br/>

                    <Button className="btn-space_BOT" onClick={() => {c_selected("180")}}>
                        <img width="250"
                             style={{transform: "rotate(180deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 180°"
                        />
                    </Button >
                    <Button className="btn-space_BOT" onClick={() => {c_selected("270")}}>
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