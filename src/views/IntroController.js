import {useEffect} from "react";


export default IntroController;
function IntroController(){

    useEffect(() => {
        setTimeout(() => {
            window.open('/acuityTestController', '_self');
        }, 10000) },[]);

    return (<>
        <h1>Regarde sur l'ordinateur</h1>
    </>)
}