import React, {useState} from 'react';
import {NavBar} from "../components/NavBar";
import SizeImage from "../components/SizeImage";
import {Button, ButtonGroup, Modal, ModalBody} from "reactstrap";
import Draggable from "react-draggable";
import c from "../assets/c_picture.png";

export function AcuityTestScreen(){
const [modal, setModal] = useState(false);
const toggle = () => setModal(!modal);
const [axe, setAxe] = useState(-0.3);

    return(
        <>
            <NavBar/>
            <h1>Test screen</h1>
            <SizeImage axe={axe}/>
            <button type="button" className="btn btn-primary btn-lg m-5" onClick={() => {toggle()}}>Controller screen</button>
            <Draggable>
            <Modal isOpen={modal}
                   toggle={toggle}>
                <ModalBody>
                    <ButtonGroup>
                        <Button className="btn btn-secondary" onClick={() => {setAxe(0)}}>
                            <img width="250"
                                 style={{transform: "rotate(0deg)"}}
                                 src={c}
                                 className="img-thumbnail"
                                 alt="c 0°"
                            />
                        </Button>
                        <Button className="btn btn-secondary" onClick={() => {setAxe(90)}}>
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
                        <Button className="btn btn-secondary" onClick={() => {setAxe(180)}}>
                            <img width="250"
                                 style={{transform: "rotate(180deg)"}}
                                 src={c}
                                 className="img-thumbnail"
                                 alt="c 180°"
                            />
                        </Button >
                        <Button className="btn btn-secondary" onClick={() => {setAxe(270)}}>
                            <img width="250"
                                 style={{transform: "rotate(270deg)"}}
                                 src={c}
                                 className="img-thumbnail"
                                 alt="c 270°"
                            />
                        </Button>
                    </ButtonGroup>
                </ModalBody>
            </Modal>
            </Draggable>
        </>
    )
}
