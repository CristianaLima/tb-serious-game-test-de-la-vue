import React, {useEffect, useState} from "react";
import {LS_C_SELECTED,  MAXREP} from "../views/App";
import {algoSimulation} from "../algo/algoSimulation";

export function SizeImage(){
    const [testFinish, setTestFinish] = useState(false)
    const [size, setSize] = useState(100);
    const [rotation, setRotation] = useState(0);
    const [array, setArray] = useState([0,0,0,0,-1]);
    const [orientationArray] = useState([]);
    let rot=rotation;
    let status = false;
    let tour = 1;
    let answer;
    const algo = new algoSimulation();



    // Each time an answer is selected, next C appeared
    useEffect(() => {
        constructOrientationArray();
        setRotation(orientationArray[0])
        console.log("actual axe: " + orientationArray[0])
        localStorage.setItem(LS_C_SELECTED, JSON.stringify({tour: 0, axe:-1}))
        window.dispatchEvent(new Event("storage"));
        window.addEventListener("storage", e =>{
                if (tour < MAXREP ){
                    const newValue = JSON.parse(localStorage.getItem(LS_C_SELECTED))
                    console.log("C SELECTED: " +  newValue.axe + " tour:" +newValue.tour)
                    //console.log("actual axe: " + array[4])
                    console.log("actual axe: " + rotation)
                    tour = newValue.tour;
                    setRotation(orientationArray[tour]) //Change rotation

                    console.log("OrientationArray " + orientationArray[tour])
                    //TODO: change size
                    //Test if the selected C is the correct one
                    if(newValue.axe == orientationArray[tour-1]){
                        answer = 1;
                    }else{
                        answer = 0;
                    }

                    console.log("answer : " + answer)
                    //Call update from algo (param : answer, return new size)
                    setSize(algo.update(answer));

                    //setRotation(testValue()) //Change rotation
                    //console.log("fucking tour" + tour);

                    //console.log("rotation : " + rotation.toString())



                }
            }
        );
    }, []);


    function constructOrientationArray(){
        orientationArray.push(randomAxe());

        //TODO : Régulation

        for (let i = 0; i < MAXREP-1; i++) {
            let finiWhile = 0;
            do{
                let rand = randomAxe();
                if(orientationArray[i] !== rand){
                    orientationArray.push(rand);
                    finiWhile = 1;
                }
            }while (finiWhile === 0);
        }

        console.log("tableau des enfers : " + orientationArray);
    }


    function testValue() {
        if (testFinish === false) {
        randomAxe();
        while(rot === array[4] || status === false) {
            console.log("boucle in-----------------------------")
            if (rot === array[4]){
                randomAxe();
            }
            else {
                if (status === false) {
                    switch (rot) {
                        case 0:
                            if (array[0] < (MAXREP / 4) && rot !== array[4]) {
                                array[0] += 1;
                                status = true;
                             } else {
                            randomAxe();
                            }
                            break;
                        case 90:
                            if (array[1] < (MAXREP / 4) && rot !== array[4]) {
                                array[1] += 1;
                                status = true;
                            } else {
                                randomAxe();
                            }
                            break;
                        case 180:
                            if (array[2] < (MAXREP / 4) && rot !== array[4]) {
                                array[2] += 1;
                                status = true;
                            } else {
                                randomAxe();
                            }
                            break;
                        case 270:
                            if (array[3] < (MAXREP / 4) && rot !== array[4]) {
                                array[3] += 1;
                                status = true;
                            } else {
                                randomAxe();
                            }
                            break;
                        }
                    }
                }
            }
        if (tour>=MAXREP){
            status = true;
            setTestFinish(true)
            return
        }else {
            status = false;
        }

        console.log("tableau "+array);
        console.log("array[4] "+array[4]);
        array[4] = rot;
        return rot;
        }
    }

    function randomAxe()  {
        const min = 0;
        const max = 4;
        let random = min + Math.random() * (max - min);
        random = parseInt(random);
        switch (random){
            case 0 :
                rot = 0
                //console.log("return "+rot)
                return rot;
            case 1 :
                rot = 90
                //console.log("return "+rot)
                return rot;
            case 2 :
                rot = 180
                //console.log("return "+rot)
                return rot;
            case 3 :
                rot = 270
                //console.log("return "+rot)
                return rot;

        }
    }

    return (
        <div>
            <input
                id="ranger"
                type="range"
                min="50"
                max="250"
                value={size}
                onChange={e => {
                    const { value } = e.target;
                    setSize(parseInt(value, 10));
                }}
            />
            {testFinish===false ?
                <button onClick={()=>{}}>
                    Tournez le C
                </button> :  <div>Test Finish</div>}
            <div>
                <img
                    id="image"
                    className="carteImg"
                    alt="Weiswampach Carte"
                    src={"https://www.ocnishop.cz/wp-content/uploads/2019/11/59577_602600_landolt_c_plastic_letter.jpg"}
                    style={{ width: `${size}px` ,transform: `rotate(${rotation}deg)`}}
                />
                <div>{rotation}</div>
            </div>
        </div>
    );

}



export default SizeImage