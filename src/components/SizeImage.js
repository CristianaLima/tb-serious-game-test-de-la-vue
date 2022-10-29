import React, {useState} from "react";

export function SizeImage({ axe }){
    axe = (axe+1)*100;
    const [size, setSize] = useState(axe);
    const [rotation, setRotation] = useState(0);
    const [array, setArray] = useState([0,1,2,3,0]);



    function testValue() {
        console.log("before if testValue "+rotation);
        console.log(array[4]);
        if(rotation === array[4]){
            setRotation(randomAxe());
            console.log("inside If "+rotation);
        }
        console.log("after if testValue "+rotation);
        array[4] = rotation;
        console.log(array);
        console.log(array[4]);
        return rotation;
    }

    function randomAxe()  {
        const min = 0;
        const max = 4;
        let random = min + Math.random() * (max - min);
        random = parseInt(random);
        console.log("before Switch Case"+random);
        switch (random){
            case 0 :
                //setRotation(0)
                return 0;
            case 1 :
                //setRotation(90)
                return 90;
            case 2 :
                //setRotation(180)
                return 180;
            case 3 :
                //setRotation(270)
                return 270;

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
            <button onClick={()=>{setRotation(testValue)}}>
                Tournez le C
            </button>
            <div>
                <img
                    id="image"
                    className="carteImg"
                    alt="Weiswampach Carte"
                    src={"https://www.ocnishop.cz/wp-content/uploads/2019/11/59577_602600_landolt_c_plastic_letter.jpg"}
                    style={{ width: `${size}px` ,transform: `rotate(${rotation}deg)`}}
                />
                <div>{rotation}</div>
                <div>{array[4]}</div>
            </div>
        </div>
    );

}



export default SizeImage