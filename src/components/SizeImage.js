import React, {useState} from "react";


export function SizeImage({ axe }){
    axe = (axe+1)*100;
    const [size, setSize] = useState(axe);

    function randomAxe()  {
        const min = 0;
        const max = 4;
        let rotation = min + Math.random() * (max - min);
        rotation = parseInt(rotation);
        switch (rotation){
            case 0 :
                console.log(0)
                return 0;
            case 1 :
                console.log(90)
                return "90";
            case 2 :
                console.log(180)
                return "180";
            case 3 :
                console.log(270)
                return "270";
        }
        console.log(rotation)
        return rotation
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
            <div>
                <img
                    id="image"
                    className="carteImg"
                    alt="Weiswampach Carte"
                    src={"https://www.ocnishop.cz/wp-content/uploads/2019/11/59577_602600_landolt_c_plastic_letter.jpg"}
                    style={{ width: `${size}px` ,transform: `rotate(${randomAxe()}deg)`}}
                />
            </div>
        </div>
    );

}



export default SizeImage