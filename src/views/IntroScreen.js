import introVideo from "../assets/Video/Intro.mp4"
import {useEffect, useRef, useState} from "react";


export default IntroScreen;
function IntroScreen(){
    const [windowDimensions] = useState(getWindowDimensions());
    const vidRef=useRef();

    useEffect(() => {
        setTimeout(() => {
            window.open('/acuityTestScreen', '_self');
    }, 10000) },[]);

    function getWindowDimensions() {
        const {innerWidth: width, innerHeight: height} = window;
        return {
            width,
            height
        };
    }

    return(<>
        <video ref={vidRef} src={introVideo} height={windowDimensions.height-10} width={windowDimensions.width} autoPlay muted/>
    </>)
}