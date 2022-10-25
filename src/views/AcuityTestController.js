import React, {useState} from 'react';
import c1 from '../assets/c1.png'
import c2 from '../assets/c2.png'
import c3 from '../assets/c3.png'
import c4 from '../assets/c4.png'
import {Button, ButtonGroup} from "reactstrap";

export function AcuityTestController(){

    const Click_c1 = () => {
        console.log("c1_click");
    };
    const Click_c2 = () => {
        console.log("c2_click");
    };
    const Click_c3 = () => {
        console.log("c3_click");
    };
    const Click_c4 = () => {
        console.log("c4_click");
    };

    return (
        <>
        <ButtonGroup>
            <Button class="btn btn-secondary" onClick={Click_c1} >
                <img width="250"
                    src={c1}
                     class="img-thumbnail"
                    alt="C right"
                />
            </Button>
            <Button class="btn btn-secondary" onClick={Click_c2}>
                <img width="250"
                    src={c2}
                    class="img-thumbnail"
                    alt="C bot"
                />
            </Button>
        </ButtonGroup>
            <br/>
    <ButtonGroup>
            <Button class="btn btn-secondary" onClick={Click_c3}>
                <img width="250"
                    src={c3}
                    class="img-thumbnail"
                    alt="C left"
                />
            </Button >
            <Button class="btn btn-secondary" onClick={Click_c4}>
                <img width="250"
                    src={c4}
                    class="img-thumbnail"
                    alt="C top"
                />
            </Button>
        </ButtonGroup>
            </>
    );
}