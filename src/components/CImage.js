import React, {useEffect, useState} from "react";
import {
    LS_C_SELECTED,
    LS_CURRENT_THERAPIST,
    LS_NEW_RESULTS,
    LS_STUDENT,
    MAXREP, SS_WEAR_GLASSES
} from "../views/App";
import c from "../assets/c_picture.png";
import {useNavigate} from "react-router-dom";
import jsQuestPlus, {func_resp0, func_resp1} from "../algo/jsQuestPlus";
import {Button, Table} from "reactstrap";

/**
 *
 * response: stock tour and angle given by the controller screen
 * answer: true or false depend on real angle and the response
 * angleArray : list of angle calculated at beginning
 * angle : actual angle of C displayed
 * size : actual size of C displayed
 * status : 0 = not begins, 1 = begins, 2 = finish
 * results : array of size
 */
export function CImage() {
    const navigate = useNavigate();
    const [angleArray] = useState(() => constructAngleArray());

    const [response, setResponse] = useState({tour: 0, angle: 0});
    const [angle, setAngle] = useState(angleArray[0]);
    const [size, setSize] = useState(100);
    const [status, setStatus] = useState(0);
    const [newTests, setNewTests] = useState(() => {
        return JSON.parse(localStorage.getItem(LS_NEW_RESULTS));
    });
    const [contrast_samples] = useState(jsQuestPlus.linspace(-40, 0));
    const [threshold_samples] = useState(jsQuestPlus.linspace(-40, 0));
    // [2, 3, 4, 5]
    const [slope_samples] = useState(jsQuestPlus.linspace(2, 5));
    // [0, 0.01, 0.02, 0.03, 0.04]
    const [lapse_samples] = useState(jsQuestPlus.array(0, 0.01, 0.04));
    // The parameter of guess is assumed as a single value.
    const [guess] = useState([0.5]);
    const [jsqp] = useState(new jsQuestPlus({
        psych_func: [func_resp0, func_resp1],
        stim_samples: [contrast_samples],
        psych_samples: [threshold_samples, slope_samples, guess, lapse_samples]
    }));
    const [results, setResults] = useState([jsqp.getStimParams() / (40 * 1.3) + 1]);
    const [params, setParams] = useState([jsqp.getStimParams()]);


    useEffect(() => {
        localStorage.setItem(LS_NEW_RESULTS, JSON.stringify(newTests));
    }, [newTests]);

    /**
     * Add a listener on local storage
     * Stock the new value in response
     */
    useEffect(() => {
        window.dispatchEvent(new Event("storage"));
        window.addEventListener("storage", () => {
                // Get info from local storage
                setResponse(JSON.parse(localStorage.getItem(LS_C_SELECTED)))
            }
        );
    }, []);

    /**
     * Each time response is changed, this use effect can
     * - do nothing if first tour
     * - set result if test is finish
     * - change size and angle of next C on other case
     */
    useEffect(() => {
        switch (response.tour) {
            case 0 :
                break;
            case MAXREP + 1 :
                setStatus(2);
                setNewTests([...newTests, {
                    idStudent: JSON.parse(localStorage.getItem(LS_STUDENT)).id,
                    localIdStudent: JSON.parse(localStorage.getItem(LS_STUDENT)).localId,
                    dateTest: Date.now(),
                    correction: sessionStorage.getItem(SS_WEAR_GLASSES),
                    comprehension: true,
                    rounds: 1,
                    vaRe: results[results.length - 1],
                    vaLe: results[results.length - 1],
                    idTherapist: JSON.parse(localStorage.getItem(LS_CURRENT_THERAPIST)).id,
                }])
                setSize(0); // C disappear
                break;
            default : {
                // Test begins
                setStatus(1);

                // https://kurokida.github.io/jsQuestPlus/
                let stim = jsqp.getStimParams()
                if (response.angle.toString() === angleArray[response.tour - 1].toString()) {
                    jsqp.update(stim, 1)
                } else {
                    jsqp.update(stim, 0)
                }
                const stimParams = jsqp.getStimParams()
                // stimParams: init -18, --> -40 if correct and --> 0 if false

                // Algo jsQuestPLus reaction
                setResults(results => [...results, stimParams / (40 * 1.3) + 1])
                setParams(params => [...params, stimParams])
                setSize((stimParams / 40 + 1) * 100)

                // Rotate C
                setAngle(angleArray[response.tour])

                if (response.tour === MAXREP) {
                    setResponse({...response, tour: MAXREP + 1})
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
        return array
    }

    function ShowValuesForDev() {
        return (
            <div>
                <h5>Last param : {jsqp.getStimParams()} (scaled
                    : {(jsqp.getStimParams() / (40 * 1.3) + 1).toPrecision(2)})</h5>


                <table align={'center'}>
                    <th colSpan={8}>All values :</th>
                    <tbody>
                    <tr>
                        <td>Turn</td>
                        {params.map((value, index) => {
                            return <td style={{width: '50px'}}>{index}</td>
                        })}
                    </tr>
                    <tr>
                        <td>Origin</td>
                        {params.map((value) => {
                            return <td style={{width: '50px'}}>{value.toPrecision(2)}</td>
                        })}
                    </tr>
                    <tr>
                        <td>Scaled</td>
                        {results.map((value) => {
                            return <td style={{width: '50px'}}>{value.toPrecision(2)}</td>
                        })}
                    </tr>
                    </tbody>
                </table>

                <table align={'center'}>
                    <th colSpan={5}>Estimates :</th>
                    <tr>
                        <td>Mode</td>
                        {jsqp.getEstimates().map(value => {
                            return <td style={{width: '50px'}}>{value}</td>
                        })}
                    </tr>
                    <tr>
                        <td>Mean</td>
                        {jsqp.getEstimates('mean').map(value => {
                            return <td style={{width: '50px'}}>{value}</td>
                        })}
                    </tr>
                </table>

                <table align={'center'}>
                    <thead>
                    <th>Standard Deviations :</th>
                    </thead>
                    {jsqp.getSDs().map((value) => {
                        return <tr>{value}</tr>
                    })}
                </table>
            </div>
        );
    }

    return (
        <div>
            {status <= 1 ?
                <>
                    <img
                        id="image"
                        alt="C landolt"
                        src={c}
                        style={{
                            width: `${size}px`,
                            transform: `rotate(${angle}deg)`,
                            position: 'absolute', left: '50%', top: '50%',
                        }}
                    />

                    <ShowValuesForDev/>

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
        </div>
    );
}

export default CImage