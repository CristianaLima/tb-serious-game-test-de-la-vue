import React, {useEffect, useState} from "react";
import {LS_C_SELECTED,  MAXREP} from "../views/App";
import {algoSimulation} from "../algo/algoSimulation";

export function SizeImage(){
    const [testStatus, setTestStatus] = useState(0) //0 = not begins, 1 = begins, 2 = finish
    const [size, setSize] = useState(100);
    const [rotation, setRotation] = useState(0);
    const [answer, setAnswer] = useState(-1);

    let orientationArray;
    let array2 = [];
    let tour = 1;

    const algo = new algoSimulation(MAXREP);

    // Each time an answer is selected, next C appeared
    useEffect(() => {
        constructOrientationArray();
        setRotation(orientationArray[0])
        console.log("actual axe: " + orientationArray[0])
        localStorage.setItem(LS_C_SELECTED, JSON.stringify({tour: 0, axe:-1}))
        window.dispatchEvent(new Event("storage"));
        window.addEventListener("storage", e =>{
                if (tour < MAXREP-1 ){
                    setTestStatus(1); // test begins

                    const newValue = JSON.parse(localStorage.getItem(LS_C_SELECTED))

                    tour = newValue.tour;
                    setRotation(orientationArray[tour]) //Change rotation

                    //Test if the selected C is the correct one
                    if(newValue.axe == orientationArray[tour-1]){
                        setAnswer(1)
                        setSize(algo.update(1)*100);
                    }else{
                        setAnswer(0)
                        setSize(algo.update(0)*100);
                    }

                }else{
                    console.log("Test finish, results is : " + algo.getResult())
                    setSize(0);
                    setTestStatus(2);
                }
            }
        );
    }, []);

    //Constructing an array with equal part of each angle. Then shuffle it until there isn't two identical values in a row
    function constructOrientationArray(){

        //Constructing
        for (let i = 0; i < MAXREP; i++) {
            switch (i%4){
                case 0 : array2.push(0);
                    break;
                case 1 : array2.push(90);
                    break;
                case 2 : array2.push(180);
                    break;
                case 3 : array2.push(270);
                    break;
            }
        }

        //Shuffling
        let result = false;

        while(result == false){
            result = true;
            array2.sort(() => Math.random() - 0.5);

            for (let i = 1; i < array2.length; i++) {
                if(array2[i] == array2[i-1]){
                    result = false;
                }
            }
        }
        orientationArray = array2;
        //console.log("Shuffled array : " + orientationArray);
    }

    return (
        <div>
            {testStatus!==2 ?
                <>
                    <img
                        id="image"
                        className="carteImg"
                        alt="Weiswampach Carte"
                        src={"https://www.ocnishop.cz/wp-content/uploads/2019/11/59577_602600_landolt_c_plastic_letter.jpg"}
                        style={{ width: `${size}px` ,transform: `rotate(${rotation}deg)`}}
                    />
                    {testStatus===0 ? "" : <div>last answer was {answer===1? "true" : "false"}</div>}

                </>
                :  <div>Test Finish</div>}
            <div>

            </div>
        </div>
    );

}



export default SizeImage