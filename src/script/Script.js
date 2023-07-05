import React, {useEffect, useState} from "react";
import jsQuestPlus, {func_resp0, func_resp1} from "../algo/jsQuestPlus";
import {MAXREP} from "../views/App";
import {Button} from "reactstrap";


export default Script;


/**
 * This code give the possibility to test the algorithm
 *
 *
 * */
function Script() {
//give random responses
    function getRandomResponse() {
        var randomResponses = [];
        for (let i=0; i< MAXREP; i++) {
            const randomResponse = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
            if (randomResponse === 1) {
                randomResponses = [...randomResponses, true];
            } else {
                randomResponses = [...randomResponses, false];
            }
        }
        return randomResponses;

    }

    function doScript(nb) {
        //all the parameters to do the algorithm
        let contrast_samples = jsQuestPlus.linspace(-40, 0);
        let threshold_samples = jsQuestPlus.linspace(-40, 0);
        let slope_samples = jsQuestPlus.linspace(2, 5);
        let lapse_samples = jsQuestPlus.array(0, 0.01, 0.04);
        let guess = [0.5];
        let jsqp = new jsQuestPlus({
            psych_func: [func_resp0, func_resp1],
            stim_samples: [contrast_samples],
            psych_samples: [threshold_samples, slope_samples, guess, lapse_samples]
        });

        let responseAngle = getRandomResponse();
        let localResponses = [], localAllResponses = [];

        //loop for each
        for (let j=0; j<nb; j++) {

            responseAngle = getRandomResponse();

            //do one time the test (for one person)
            for (let i = 0; i < MAXREP; i++) {

                const stim = jsqp.getStimParams();
                if (responseAngle[i]) {
                    jsqp.update(stim, 1);
                } else {
                    jsqp.update(stim, 0);
                }
                const stimParams = jsqp.getStimParams();

                const responseGive = {
                    "correctAngle": responseAngle[i],
                    "vaEyes": stimParams / (40 * 1.3) + 1,
                    "origin": stimParams,
                    "estimateMode": jsqp.getEstimates(),
                    "estimateMean": jsqp.getEstimates("mean"),
                    "standardDeviations": jsqp.getSDs()
                };
                localResponses = [...localResponses, {"tour": i+1, "response": responseGive}];
            }
            localAllResponses = [...localAllResponses, {"nbPerson": j+1, "responses": localResponses}];
            localResponses=[];

            contrast_samples = jsQuestPlus.linspace(-40, 0);
            threshold_samples = jsQuestPlus.linspace(-40, 0);
            slope_samples = jsQuestPlus.linspace(2, 5);
            lapse_samples =jsQuestPlus.array(0, 0.01, 0.04);
            guess = [0.5];
            jsqp = new jsQuestPlus({
                psych_func: [func_resp0, func_resp1],
                stim_samples: [contrast_samples],
                psych_samples: [threshold_samples, slope_samples, guess, lapse_samples]
            });


        }
        localStorage.setItem("localScript", JSON.stringify(localAllResponses));
    }

    return (

        <Button className="m-5" size="lg" color="secondary" onClick={() => doScript(500)}>
            Script
        </Button>
    )
}

