import React, {useEffect, useState} from 'react';
import c from "../assets/c_picture.png";
import {LS_C_SELECTED, MAXREP} from "./App";
import '../css/Button.css';
import {Button} from "reactstrap";

export function AcuityTestController(){

    const [tour, setTour] = useState(0)

    const [active0, setActive0] = useState(true);
    const [active90, setActive90] = useState(true);
    const [active180, setActive180] = useState(true);
    const [active270, setActive270] = useState(true);

    function C_selected (e, f) {
        switch (e) {
            case '0': {
                setActive0(!active0);
                setTimeout(() => {
                    setActive0(active0);
                }, 1000);
                break;
            }
            case '90': {
                setActive90(!active90);
                setTimeout(() => {
                    setActive90(active90);
                }, 1000);
                break;
            }
            case '180': {
                setActive180(!active180);
                setTimeout(() => {
                    setActive180(active180);
                }, 1000);
                break;
            }
            case '270': {
                setActive270(!active270);
                setTimeout(() => {
                    setActive270(active270);
                }, 1000);
                break;
            }
            default: {
                break;
            }
        }

        const handleClick = (f: React.MouseEvent<HTMLButtonElement>) => {
            console.log(f)
            switch (f.detail) {
                case 1:
                    console.log("click");
                    break;
                case 2:
                    console.log("double click");
                    break;
                case 3:
                    console.log("triple click");
                    break;
            }
        };
        const f1 = (f: React.MouseEvent<HTMLButtonElement>);

        console.log(f1);
        if(f == 1){
            console.log("Click1")
        }

        if(f === 2){
            console.log("clic2")
            localStorage.setItem(LS_C_SELECTED, JSON.stringify({tour: tour+1, angle:e}))
            setTour(tour+1)
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(e)
        switch (e.detail) {
            case 1:
                console.log("click");
                break;
            case 2:
                console.log("double click");
                break;
            case 3:
                console.log("triple click");
                break;
        }
    };

    //TODO essayer de faire fonctionner la constante handleClick avec le reste
    return (
        <>
            {tour === MAXREP ? <div><p>Test finish</p></div> : <>
                <br/>
                    <Button className={"btn-space_TOP"} onClick={() => {C_selected("0", MouseEvent)}}
                            style={{backgroundColor: active0?  "#6C757D" : "green"}}>
                        <img width="250"
                             style={{transform: "rotate(0deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 0°"
                        />
                    </Button>
                    <Button className="btn-space_TOP" onClick={() => {C_selected("90")}}
                            style={{backgroundColor: active90?  "#6C757D" : "green"}}>
                        <img width="250"
                             style={{transform: "rotate(90deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 90°"
                        />
                    </Button>

                <br/>

                    <Button className="btn-space_BOT" onClick={() => {C_selected("180")}}
                            style={{backgroundColor: active180?  "#6C757D" : "green"}}>
                        <img width="250"
                             style={{transform: "rotate(180deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 180°"
                        />
                    </Button >
                    <Button className="btn-space_BOT" onClick={() => {C_selected("270")}}
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