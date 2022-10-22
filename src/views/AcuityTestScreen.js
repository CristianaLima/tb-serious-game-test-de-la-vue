import React, {useState,useEffect} from 'react';
import {NavBar} from "../components/NavBar";




export function AcuityTestScreen(){

    const [imageSize, setImageSize] = useState({
        height: 300,
        unit: "px",
        width: 300,
    });
    const SessionDataStorage = (event) => {
        event.preventDefault();
        setImageSize({...imageSize,height: event.target.value,width:event.target.value });
        sessionStorage.setItem("imageSize", imageSize.width);
        console.log("from session data "+imageSize.width);


    };

    // useEffect(() => {
    //     // Access count value from session storage
    //    let sizeOfImage = sessionStorage.getItem("imageSize");
    //     if (sizeOfImage == null) {
    //         // Initialize page views count
    //         sizeOfImage = 300;
    //     } else {
    //         // Increment count
    //         sizeOfImage = sizeOfImage;
    //     }
    //     // Update session storage
    //     sessionStorage.setItem("imageSize", sizeOfImage);
    //
    // }, [imageSize]); //No dependency to trigger in each page load


    // const sizeOfImage =sessionStorage.getItem("imageSize")
        // if(sizeOfImage!==null){
        //     setImageSize({...imageSize, height:sizeOfImage.valueOf()});
        // }else{
        //     sessionStorage.setItem("imageSize", imageSize);
        // }


    function imageSizing(event) {
        event.preventDefault();
        setImageSize({...imageSize,height: event.target.value,width:event.target.value });
        console.log("from imageSizing "+imageSize.width);

    }

    return(
        <div>
            <NavBar/>
            <h1>Test screen</h1>
            <div>
                <form onSubmit={imageSizing}>
                    <label>
                        Size of Image:
                        <input type="text" value={imageSize.height}  onChange={(e) => imageSizing(e)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <img
                    style={imageSize}
                    src="https://www.ocnishop.cz/wp-content/uploads/2019/11/59577_602600_landolt_c_plastic_letter.jpg" />
            </div>
        </div>

    )
}