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
    size = 1;
    result = 1;
    results = [];
    n_trials;


    constructor(n_trials) {
        this.n_trials = n_trials;
    }

    update(answer){

        if(answer == 1){
            this.result = this.size;
            this.results.push(this.size);
            if(this.size<0.5)
                this.size = this.size /1.4;
            else
                this.size = this.size /1.8;
        }
        else{
            if(this.size<1)
                this.size = this.size * 1.8;
        }

        return this.size;
    }

    getResult(){
        return this.result;
    }

    getResults(){
        return this.results;
    }
}