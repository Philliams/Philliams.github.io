//======================================
//=========== Neuron class =============
//======================================

function Neuron(input_size){

	// class attributes

	var e = 2.7182818285;
	var weights = [];
	var bias = 0.0;
	var last_input = null;

	for(var i = 0; i < input_size; i++){
		weights.push(0.0);
	}

	// class functions

	this.getWeights = function(){
		return weights;
	}

	this.getWeight = function(index){
		return weights[index];
	}

	this.getBias = function(){
		return bias;
	}

	this.getInputSize = function(){
		return weights.length;
	}

	this.output = function(input){
		var sum = bias;
		for(var i = 0; i < weights.length; i++){
			sum += input[i]*weights[i];
		}
		last_input = input;
		return this.sigmoid(sum);
	}

	// learning functions

	this.gradientDescent = function(delta,nabla,gamma){
		for(var i = 0; i < weights.length; i++){
            weights[i] += nabla*delta*this.outputDerivative(last_input)*last_input[i];
        }
        bias += gamma*delta*this.outputDerivative(last_input);
	}

	// math functions

	this.sigmoid = function(z){
		return 1.0/(1.0 + Math.pow(e,-z))
	}

	this.sigmoidPrime = function(z){
		var s = this.sigmoid(z);
		return s*(1-s);
	}

	this.outputDerivative = function(input){
        var sum = bias;
        for(var i = 0; i < weights.length; i++){
            sum += input[i] * weights[i];
        }
        return this.sigmoidPrime(sum);
	}

	// return instance

	return this;
};

//=======================================
//============ Layer class ==============
//=======================================

function Layer(size,input_size){

	// class attributes

	var neurons = [];

	for(var i = 0; i < size; i++){
		var temp = new Neuron(input_size);
		neurons.push(temp);
	}

	// class functions

	this.layerSize = function(){
		return neurons.length;
	}

	this.inputSize = function(){
		return neurons[0].getInputSize;
	}

	this.getNeuron = function(index){
		return neurons[index];
	}

	// math functions

	this.output = function(input){
		var output = [];
        for(var i = 0; i < neurons.length; i++){
            output.push(neurons[i].output(input));
        }
        return output;
	}

	// return instance

	return this;

};

//=======================================
//============== Net class ==============
//=======================================

function Network(nodes,gamma,nabla){

	// class attributes

	var layers = [];

	for(var i = 1; i < nodes.length; i++){
		var temp = new Layer(nodes[i],nodes[i-1])
		layers.push(temp);
	};

	// class functions

	this.feedForward = function(input){
		var output = layers[0].output(input);
		for(var i = 1; i < layers.length; i++){
			output = layers[i].output(output);
		}
		return output;
	}

	// math functions

	this.getError = function(input,expected){
		var output = this.feedForward(input);
		var error = [];
		for(var i = 0; i < output.length; i++){
			error.push(expected[i] - output[i]);
		}
		return error;
	}

	this.layerDeltas = function(known,knownDelta,computed){
		var computedDelta = [];
        var temp;
        for(var i = 0; i < computed.layerSize(); i++){ // iterates over each neuron in computed layer, the layer who's delta is unkown and is being calculated
            temp = 0.0;
            for(var j = 0; j < known.layerSize(); j++){
                temp += known.getNeuron(j).getWeight(i)*knownDelta[j] // calculates delta of ith neuron in the computed layer
            }
            computedDelta.push(temp);
        }
        return computedDelta; // returns deltas of the computed layer

	}

	// learning functions

	this.learn = function(input, expected){ // uses backpropagation algorithm to determine variation of weights and biases
        var deltas = []; // 2d array of delta (error) of each neuron in the net
        deltas.push(this.getError(input,expected)); // the error of the ouput layer is explicitely known, all other errors have to be calculated
        for(var i = 1; i < layers.length; i++){
            deltas.push(this.layerDeltas(layers[layers.length-i],deltas[deltas.length-1],layers[layers.length-i-1])); // appends deltas of the last layer to the first layer. Array is backwards
        }
        this.backProp(deltas.reverse()); // reverse array to be useful for gradient descent
    }
    
    this.backProp = function(deltas){
        for(var i = 0; i < layers.length; i++){ // iterate of each layer
            for(var j = 0; j < layers[i].layerSize(); j++){ // iterate over each neuron in ith layer
                layers[i].getNeuron(j).gradientDescent(deltas[i][j],nabla,gamma); // adjusts weights of jth neuron in ith layer using its repective delta, learning rates and gradient descent
            }
        }
    }

    return this;

};
