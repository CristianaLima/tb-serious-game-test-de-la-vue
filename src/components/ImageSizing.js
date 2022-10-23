import {useState} from "react";

const ImageSizing = () => {
    const [size, setSize] = useState(50);
    return (
        <div>
            <input
                id="ranger"
                type="range"
                min="1"
                max="100"
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
                    style={{ width: `${size}%` }}
                />
            </div>
        </div>
    );
}