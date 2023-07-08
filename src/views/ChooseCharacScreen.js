import {useEffect, useState} from "react";
import {LS_CHARACTER_CHOICE, LS_CHARACTER_SELECTED} from "./App";
import lapinFace from "../assets/lapinFace.png";
import oursFace from "../assets/oursFace.png";
import tigreFace from "../assets/tigreFace.png";
import lezardFace from "../assets/lezardFace.png";

export default ChooseCharacScreen;

function ChooseCharacScreen() {
    const [characSelectLink, setCharacLinkSelect] = useState("");

    useEffect(() => {
        localStorage.setItem(LS_CHARACTER_CHOICE, JSON.stringify(null));
        localStorage.setItem(LS_CHARACTER_SELECTED, JSON.stringify(null));
        let testCharacChoice, characSelect;
        const interval = setInterval(() => {
            characSelect=JSON.parse(localStorage.getItem(LS_CHARACTER_SELECTED));
            testCharacChoice = JSON.parse(localStorage.getItem(LS_CHARACTER_CHOICE));
            if (testCharacChoice!=null){
                window.open('/acuityTestScreen', '_self');
            }
            switch (characSelect){
                case "lapin":
                    setCharacLinkSelect(lapinFace);
                    break;
                case "ours":
                    setCharacLinkSelect(oursFace);
                    break;
                case "lezard":
                    setCharacLinkSelect(lezardFace);
                    break;
                case "tigre":
                    setCharacLinkSelect(tigreFace);
                    break;
                default:
                    setCharacLinkSelect("");
                    break;
            }
        }, 1000);
        return () => clearInterval(interval);
    },[]);

    return(
        <>
            <h1>Choisi ton personnage</h1>

            {characSelectLink===""? <></> :
            <img
                src={characSelectLink}
                alt="Personnage selectionne"
            />}

        </>
    )
}