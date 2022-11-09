import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup} from "reactstrap";
import c from "../assets/c_picture.png";
import {LS_C_SELECTED, MAXREP} from "./App";

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

    //Function to track cursor on click who depend on the element (call from render)
    const handleMouseClickLocal = (event) => {
        //  Get mouse position relative to element
        const localX = event.clientX - event.target.offsetLeft;
        const localY = event.clientY - event.target.offsetTop;

        setLocalMousePos({ x: localX, y: localY });
    };

    //Set a listener for the global positioning
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
                <ButtonGroup onClick={handleMouseClickLocal}>
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
                <ButtonGroup onClick={handleMouseClickLocal}>
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
                <h1>{"Local Mouse coords : X:" + localMousePos.x +" Y:" + localMousePos.y}</h1>
            </> }
        </>
    );
}