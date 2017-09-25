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

var _train_data = app.loadJSON('train/' + argv.nn);
var cfg_data = app.loadJSON('cfg/' + argv.nn);

//https://www.npmjs.com/package/brain.js


var brain = require('brain.js');

var nn = new brain.NeuralNetwork(cfg_data);

//var nn = new brain.recurrent.RNN();

var train_data = [];

for(var i = 0; i < _train_data.length; i++) {
	
	var _td_item = {
		input : {},
		output : {},
	};
	
	for(var _k in _train_data[i].input) {
		_td_item.input[_k] = (1/(1 + (Math.exp(- _train_data[i].input[_k]))));
	}
	
	for(var _k in _train_data[i].output) {
		_td_item.output[_k] = (1/(1 + (Math.exp(- _train_data[i].output[_k]))));
	}
	
	train_data.push(_td_item);
	
}


nn.train(train_data, {
	errorThresh : 0.0005,	// error threshold to reach 0.005
	iterations : 20000,		// maximum training iterations
	log : true,				// console.log() progress periodically
	logPeriod : 1,			// number of iterations between logging
	learningRate : 0.1		// learning rate
});

app.saveJSON('nn/' + argv.nn, nn.toJSON());
app.saveJSON('normal/' + argv.nn, train_data);

//(1/(1 + (Math.exp(-x)))).toString()