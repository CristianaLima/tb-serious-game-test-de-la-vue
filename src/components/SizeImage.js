import React, {useState} from "react";

export function SizeImage({ axe }){
    axe = (axe+1)*100;
    const [size, setSize] = useState(axe);
    const [rotation, setRotation] = useState(0);
    const [array, setArray] = useState([0,0,0,0,0]);
    let rot=rotation;
    const maxRep = 8;
    let status = false;
    let result=0;

    function testValue() {
        randomAxe();
        while(rot === array[4] || status === false) {
            console.log("boucle in")
        if (rot === array[4]){
            randomAxe();
        }
        else {
            if (status === false) {
                switch (rot) {
                    case 0:
                        if (array[0] < (maxRep / 4) && rot !== array[4]) {
                            array[0] += 1;
                            status = true;
                        } else {
                            randomAxe();
                        }
                        break;
                    case 90:
                        if (array[1] < (maxRep / 4) && rot !== array[4]) {
                            array[1] += 1;
                            status = true;
                        } else {
                            randomAxe();
                        }
                        break;
                    case 180:
                        if (array[2] < (maxRep / 4) && rot !== array[4]) {
                            array[2] += 1;
                            status = true;
                        } else {
                            randomAxe();
                        }
                        break;
                    case 270:
                        if (array[3] < (maxRep / 4) && rot !== array[4]) {
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

        for (let i = 0; i < 4; i++) {
            result = result+ array[i];
        }
        console.log("resultat: "+result);

        if (result>=maxRep){
            status = true;
            return (
                <div>Test Finish</div>
            );
        }else {
            status = false;

        }

        console.log("tableau "+array);
        console.log("array[4] "+array[4]);
        array[4] = rot;
        return rot;
    }

    function randomAxe()  {
        const min = 0;
        const max = 4;
        let random = min + Math.random() * (max - min);
        random = parseInt(random);
        switch (random){
            case 0 :
                rot = 0
                console.log("return "+rot)
                return rot;
            case 1 :
                rot = 90
                console.log("return "+rot)
                return rot;
            case 2 :
                rot = 180
                console.log("return "+rot)
                return rot;
            case 3 :
                rot = 270
                console.log("return "+rot)
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
            <button onClick={()=>{setRotation(testValue())}}>
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
            </div>
        </div>
    );

}



export default SizeImage