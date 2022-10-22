import React, {useState} from 'react';
import {NavBar} from "../components/NavBar";

export function AcuityTestScreen(){
    const [imageSize, setImageSize] = useState({
        height: 250,
        unit: "px",
        width: 250,
    });
    function imageSize(x) {
        setImageSize(
            imageSize.height=x,
            imageSize.width=x,
            imageSize.unit="px",
        );
    }
    return(
        <div>
            <NavBar/>
            <h1>Test screen</h1>
            <div>

                <img
                    // width={250}
                    // height={250}
                    style={imageSize}
                    src="https://www.ocnishop.cz/wp-content/uploads/2019/11/59577_602600_landolt_c_plastic_letter.jpg" />
            </div>
        </div>

    )
}