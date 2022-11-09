import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup} from "reactstrap";
import c from "../assets/c_picture.png";
import {LS_C_SELECTED, MAXREP} from "./App";

export function AcuityTestController(){
    const [tour, setTour] = useState(0)
    const [mousePos, setMousePos] = useState({});

    useEffect(() => {
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

    function c_selected (e) {
        localStorage.setItem(LS_C_SELECTED, JSON.stringify({tour: tour+1, angle:e}))
        setTour(tour+1)
    }

    return (
        <>
            {tour === MAXREP ? <div><p>Test finish</p></div> : <>

                <ButtonGroup>
                    <Button className="btn btn-secondary" onClick={() => {c_selected("0")}}>
                        <img width="250"
                             style={{transform: "rotate(0deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 0°"
                        />
                    </Button>
                    <Button className="btn btn-secondary" onClick={() => {c_selected("90")}}>
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
                    <Button className="btn btn-secondary" onClick={() => {c_selected("180")}}>
                        <img width="250"
                             style={{transform: "rotate(180deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 180°"
                        />
                    </Button >
                    <Button className="btn btn-secondary" onClick={() => {c_selected("270")}}>
                        <img width="250"
                             style={{transform: "rotate(270deg)"}}
                             src={c}
                             className="img-thumbnail"
                             alt="c 270°"
                        />
                    </Button>
                </ButtonGroup>
                <h1>{"Mouse coords : X:" + mousePos.x +" Y:" + mousePos.y}</h1>
            </> }
        </>
    );
}