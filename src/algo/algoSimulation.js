//This is a simulation to try to understand how the algorithm work.
export class algoSimulation{

/*  //Original Params
    n_trials = 32
    min_dimensions = -0.3
    max_dimensions = 1.0
    //dimensions = np.linspace(min_dimensions, max_dimensions, 14)
    //thresh = np.linspace(min_dimensions, max_dimensions, 14)
    slope = 0.625
    lowerasymptotevals = 0.25
    lapse = 0.02
    responsevals = [1,0]
    startdimension = 1.0
    stimscale  = "log10"
    stimSelectionMethod = "minEntropy"
    paramEstimationMethod = "mean"
    name = "LandoltC_VA_4ori"*/


    //Sim params
    size = 100;


    update(answer){

        if(answer == 1){
            this.size = this.size - 10;
        }
        else{
            this.size = this.size + 10;
        }

        return this.size;
    }

    static calculateNewSize(){

    }

    getResult(){
        //return the actual treshold
    }

    getResults(){
        //return the list of all the tresholds from this test
    }
}