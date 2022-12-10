import React, {useEffect, useState} from "react";
import {LS_C_SELECTED, LS_CURRENT_THERAPIST, LS_NEW_RESULTS, LS_STUDENT, MAXREP, SS_WEAR_GLASSES} from "../views/App";
import c from "../assets/c_picture.png";
import {useNavigate} from "react-router-dom";
import jsQuestPlus, {func_resp0, func_resp1} from "../algo/jsQuestPlus";
import {Button} from "reactstrap";

export default CImage;

/**
 * CImage is called by AcuityTestScreen to display the Landolt C and the results of the test
 *
 * navigate : to move from one page to another
 * angleArray : list of angle calculated at beginning (to avoid repetition)
 * response: stock tour and angle given by the controller screen (from local storage)
 * angle : actual angle of C displayed
 * size : actual size of C displayed
 * testFinsh :
 * newTests :
 * contrast_samples, threshold_samples, slope_samples [2, 3, 4, 5], lapse_samples [0, 0.01, 0.02, 0.03, 0.04],
 *         guess : jsQuestPlus parameters
 * jsqp : jsQuestPLus object
 * vaEyes : value of the eyes given by algorithm and scaled to be between (-0.3;1)
 * params : value of the eyes given by algorithm (-40;0)
 */
function CImage() {
    const navigate = useNavigate();
    const [angleArray] = useState(() => constructAngleArray());
    const [response, setResponse] = useState({tour: 0, angle: 0});
    const [angle, setAngle] = useState(angleArray[0]);
    const [size, setSize] = useState(100);
    const [testFinish, setTestFinish] = useState(false);
    const [newTests, setNewTests] = useState(() => {
        return JSON.parse(localStorage.getItem(LS_NEW_RESULTS));
    });
    const [contrast_samples] = useState(jsQuestPlus.linspace(-40, 0));
    const [threshold_samples] = useState(jsQuestPlus.linspace(-40, 0));
    const [slope_samples] = useState(jsQuestPlus.linspace(2, 5));
    const [lapse_samples] = useState(jsQuestPlus.array(0, 0.01, 0.04));
    const [guess] = useState([0.5]);
    const [jsqp] = useState(new jsQuestPlus({
        psych_func: [func_resp0, func_resp1],
        stim_samples: [contrast_samples],
        psych_samples: [threshold_samples, slope_samples, guess, lapse_samples]
    }));
    const [vaEyes, setVaEyes] = useState([jsqp.getStimParams() / (40 * 1.3) + 1]);
    const [params, setParams] = useState([jsqp.getStimParams()]);

    /**
     * Add a listener on local storage LS_C_SELECTED : each time a new C is selected, stock the new value in response
     */
    useEffect(() => {
        window.dispatchEvent(new Event("storage"));
        window.addEventListener("storage", () => {
                setResponse(JSON.parse(localStorage.getItem(LS_C_SELECTED)));
            }
        );
    }, []);

    /**
     * Each time newTests changes, update LS_NEW_RESULTS
     */
    useEffect(() => {
        localStorage.setItem(LS_NEW_RESULTS, JSON.stringify(newTests));
    }, [newTests]);

    /**
     * Each time response is changed, this use effect
     * - do nothing if first tour
     * - set result if test is finish
     * - change size and angle of next C on other case (based on jsQuestPlus)
     * https://kurokida.github.io/jsQuestPlus/
     */
    useEffect(() => {
        switch (response.tour) {
            case 0 :
                break;
            case MAXREP + 1 :
                setTestFinish(true);
                setNewTests([...newTests, {
                    idStudent: JSON.parse(localStorage.getItem(LS_STUDENT)).id,
                    localIdStudent: JSON.parse(localStorage.getItem(LS_STUDENT)).localId,
                    dateTest: Date.now(),
                    correction: sessionStorage.getItem(SS_WEAR_GLASSES),
                    comprehension: true, //TODO: to be implemented when Comprehension Test is available
                    rounds: 1,
                    vaRe: vaEyes[vaEyes.length - 1],
                    vaLe: vaEyes[vaEyes.length - 1], // TODO: to be implemented when the test is performed twice per person (specifying the eye)
                    idTherapist: JSON.parse(localStorage.getItem(LS_CURRENT_THERAPIST)).id,
                }])
                setSize(0); // C disappear
                break;
            default : {
                const stim = jsqp.getStimParams()
                if (response.angle.toString() === angleArray[response.tour - 1].toString()) {
                    jsqp.update(stim, 1); // true response
                } else {
                    jsqp.update(stim, 0); // false response
                }
                const stimParams = jsqp.getStimParams(); // init -18, --> -40 if correct and --> 0 if false

                // Algo jsQuestPLus reaction
                setVaEyes(vaEyes => [...vaEyes, stimParams / (40 * 1.3) + 1]);
                setParams(params => [...params, stimParams]); // for ShowValuesForDev()

                // Next size and angle
                setSize((stimParams / 40 + 1) * 100);
                setAngle(angleArray[response.tour]);

                if (response.tour === MAXREP) {
                    setResponse({...response, tour: MAXREP + 1});
                }
            }
        }
    }, [response]);


    /**
     * Constructing an array with equal part of each angle.
     * Then shuffle it until there isn't two identical values in a row
     */
    function constructAngleArray() {
        let array = [];
        //Constructing
        for (let i = 0; i < MAXREP; i++) {
            switch (i % 4) {
                case 0 :
                    array.push(0);
                    break;
                case 1 :
                    array.push(90);
                    break;
                case 2 :
                    array.push(180);
                    break;
                case 3 :
                    array.push(270);
                    break;
                default :
                    array.push(-1)
            }
        }

        //Shuffling
        let result = false;

        while (result === false) {
            result = true;
            array.sort(() => Math.random() - 0.5);

            for (let i = 1; i < array.length; i++) {
                if (array[i] === array[i - 1]) {
                    result = false;
                }
            }
        }
        return array;
    }

    /**
     * This method is not for the app on itself, but it is a help for the devs who work on the algorithm,
     * showing the results and parameters
     * The function can be added or removed in the return part of CImage.js
     * In the actual state, the algo works with all their default params,
     * and the results are scaled from (-40;0) to (-0.3;1)
     */
    function ShowValuesForDev() {
        return (
            <div className="border" style={{width: '500px', margin: 'auto'}}>
                <h5>All results :</h5>
                <table align={'center'}>
                    <tbody>
                    <tr>
                        <td className="fw-bold">Turn</td>
                        {params.map((value, index) => {
                            return <td key={'turn' + index} style={{width: '50px'}}>{index}</td>
                        })}
                    </tr>
                    <tr>
                        <td className="fw-bold">Origin</td>
                        {params.map((value, index) => {
                            return <td key={'origin' + index} style={{width: '50px'}}>{value.toPrecision(2)}</td>
                        })}
                    </tr>
                    <tr>
                        <td className="fw-bold">Scaled</td>
                        {vaEyes.map((value, index) => {
                            return <td key={'origin' + index} style={{width: '50px'}}>{value.toPrecision(2)}</td>
                        })}
                    </tr>
                    </tbody>
                </table>
                <h5>Last values :</h5>
                <table align={'center'}>
                    <tbody>
                    <tr>
                        <td className="fw-bold">Mode (estimates)</td>
                        {jsqp.getEstimates().map((value, index) => {
                            return <td key={'mode' + index} >{value}</td>
                        })}
                    </tr>
                    <tr>
                        <td className="fw-bold">Mean (estimates)</td>
                        {jsqp.getEstimates('mean').map((value, index) => {
                            return <td key={'mean' + index}>{value}</td>
                        })}
                    </tr>
                    <tr>
                        <td>---</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">Standard Deviations</td>
                        {jsqp.getSDs().map((value, index) => {
                            return <td key={'deviation' + index} style={{paddingLeft: '10px'}}>{value.toPrecision(6)}</td>
                        })}
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    /**
     * Display next C if test not finish
     * otherwise display 3 buttons (Back to home, Views results, Start game)
     */
    return (
        <>
            {testFinish === false ?
                <>
                    <img
                        id="image"
                        className="carteImg"
                        alt="C landolt"
                        src={c}
                        style={{
                            width: `${size}px`,
                            transform: `rotate(${angle}deg)`,
                            position: 'absolute', left: '50%', top: '50%',
                        }}
                    />
                </>
                : <>
                    <Button className="m-5" size="lg" color="danger" onClick={() => navigate('/')}>
                        Back to home
                    </Button>
                    <Button className="m-5" size="lg" color="primary" onClick={() => navigate('/viewResults')}>
                        View results
                    </Button>
                    <Button className="m-5" size="lg" color="success" onClick={() => navigate('/startGame')}>
                        Start game
                    </Button>
                </>}
            <ShowValuesForDev/>
        </>
    );
}
