import React, {useState} from 'react';
import c from '../assets/c_picture.png'
import {Button, ButtonGroup} from "reactstrap";

export function AcuityTestController(){

    function c_selected (e) {
        console.log(e)
    }

    return (
        <>
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
            </>
    );
}