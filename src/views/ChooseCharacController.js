import {Button} from "reactstrap";
import teteLapin from "../assets/TeteLapin.png";
import teteOurs from "../assets/TeteOurs.png";
import teteTigre from "../assets/TeteTigre.png";
import teteLezard from "../assets/TeteLezard.png";
import React, {useEffect, useState} from "react";
import "../css/ChooseCharac.css";
import {LS_CHARACTER_CHOICE, LS_CHARACTER_SELECTED} from "./App";

export default ChooseCharacController;

function ChooseCharacController(){
    const [lockedDisplay, setLockedDisplay] = useState(false);
    const [mousePosList, setMouseList] = useState([]);
    const [CharcClicked, setCharacClicked] = useState('-1');
    const [windowDimensions,setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        blockClick();

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function getWindowDimensions() {
        const {innerWidth: width, innerHeight: height} = window;
        return {
            width,
            height
        };
    }
    function handleMouseClickLocal(event) {
        setMouseList([...mousePosList, {
            x: event.clientX - event.currentTarget.offsetLeft,
            y: event.clientY - event.currentTarget.offsetTop
        }]);
        if (event.target.className === "btns-background") {
            setCharacClicked('-1');
        }
    }

    function startNewRound(e) {
        localStorage.setItem(LS_CHARACTER_CHOICE, JSON.stringify(e));
        blockClick();
        window.open('/introController', '_self');
    }

    function blockClick() {
        setLockedDisplay(true);
        setTimeout(() => {
            setLockedDisplay(false);
        }, 1000);
    }

    function C_selected(e) {
        if (CharcClicked === e) {
            startNewRound(e);
        } else {
            localStorage.setItem(LS_CHARACTER_SELECTED, JSON.stringify(e));
            setCharacClicked(e);
        }
    }

    return(
        <>
            <div className={"btns-background"}
                 style={{
                     height: windowDimensions.height
                 }}
                 onClick={e => handleMouseClickLocal(e)}>
                <Button className="btn-left" onClick={() => {
                    C_selected("lapin")
                }} disabled={lockedDisplay}
                        style={{
                            marginLeft: windowDimensions.width/4,
                            margin: windowDimensions.height / 16,
                            height: windowDimensions.height / 3,
                            width: windowDimensions.height / 3,
                            backgroundColor: CharcClicked === "lapin" ? "green" : "#061436"
                        }}>
                    <img
                         src={teteLapin}
                         className="img-thumbnail"
                         alt="Tete de lapin"
                    />
                </Button>
                <Button className="btn-right" onClick={() => {
                    C_selected("ours")
                }} disabled={lockedDisplay}
                        style={{
                            marginLeft: windowDimensions.width/5,
                            margin: windowDimensions.height / 16,
                            height: windowDimensions.height / 3,
                            width: windowDimensions.height / 3,
                            backgroundColor: CharcClicked === "ours" ? "green" : "#061436"
                        }}>
                    <img
                         src={teteOurs}
                         className="img-thumbnail"
                         alt="Tete d'ours"
                    />
                </Button>
                <Button className="btn-left" onClick={() => {
                    C_selected("lezard")
                }} disabled={lockedDisplay}
                        style={{
                            marginLeft: windowDimensions.width/4,
                            margin: windowDimensions.height / 16,
                            height: windowDimensions.height / 3,
                            width: windowDimensions.height / 3,
                            backgroundColor: CharcClicked === "lezard" ? "green" : "#061436"
                        }}>
                    <img
                         src={teteLezard}
                         className="img-thumbnail"
                         alt="Tete de lezard"
                    />
                </Button>
                <Button className="btn-right" onClick={() => {
                    C_selected("tigre")
                }} disabled={lockedDisplay}
                        style={{
                            marginLeft: windowDimensions.width/5,
                            margin: windowDimensions.height / 16,
                            height: windowDimensions.height / 3,
                            width: windowDimensions.height / 3,
                            backgroundColor: CharcClicked === "tigre" ? "green" : "#061436"
                        }}>
                    <img src={teteTigre}
                         className="img-thumbnail"
                         alt="Tete de tigre"
                    />
                </Button>
            </div>
        </>
    )

}