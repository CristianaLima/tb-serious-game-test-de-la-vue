import React, {useState} from "react";


export function SizeImage({ axe }){
    const [size, setSize] = useState(axe);
    return (
        <div>
            <input
                id="ranger"
                type="range"
                min="100"
                max="800"
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
                    style={{ width: `${size}px` }}
                />
            </div>
        </div>
    );

}

export default SizeImage