'use strict';

var azbn = new require(__dirname + '/../../../../../system/bootstrap')({
	
});

var app = azbn.loadApp(module);

var argv = require('optimist')
	.usage('Usage: $0 --nn=[Name of neural network]')
	.default('nn', 'main')
	//.default('ext', '.php')
	//.demand(['str'])
	.argv
;

app.clearRequireCache(require);

var synaptic = require('synaptic');
var Layer = synaptic.Layer;
var Network = synaptic.Network;

var inputLayer = new Layer(10);
var hiddenLayer = new Layer(15);
var outputLayer = new Layer(4);

inputLayer.project(hiddenLayer)
hiddenLayer.project(outputLayer)
 
var myNetwork = new Network({
	input: inputLayer,
	hidden: [hiddenLayer],
	output: outputLayer
});


var learningRate = 0.1;
var learnData = null;
for(var i = 0; i < 3; i++){
	learnData = getData();
	myNetwork.activate(learnData.data)
	myNetwork.propagate(learningRate, learnData.teachData);
}


learnData = getData();

console.log('----------');
console.dir(learnData);
console.log('----------');
console.dir(myNetwork.activate(learnData.data));
console.log('----------');

function getRandomRange(min, max) {
	return Math.random() * (max - min) + min
}

function degreeToRad(degrees) {
	return (degrees * (Math.PI/180))
}

function getData() {
	const step = 15;
	let start = getRandomRange(0, 359);
	let data = [];
	let teachData = [];
	let value, tmpValue;
	
	for(let i = 0; i < 10; i++) {
		value = ((Math.sin(degreeToRad(start)) + 1)/2).toFixed(2) * 1;
		data.push(value);
		start += step;
	}
	
	for(i = 0; i < 2; i++) {
		tmpValue = ((Math.sin(degreeToRad(start)) + 1)/2).toFixed(2) * 1
		if((tmpValue - value) > 0) {
			teachData.push(1);
			teachData.push(0);
		} else if((tmpValue - value) < 0) {
			teachData.push(0);
			teachData.push(1);
		} else {
			teachData.push(0);
			teachData.push(0);
		}
		value = tmpValue;
		start += start;
	}
	
	return {
		data : data,
		teachData : teachData,
	};
}