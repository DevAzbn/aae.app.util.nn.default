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

var train_data = app.loadJSON('train/' + argv.nn);
var cfg_data = app.loadJSON('cfg/' + argv.nn);

//https://www.npmjs.com/package/brain.js


var brain = require('brain.js');

var nn = new brain.NeuralNetwork(cfg_data);

//var nn = new brain.recurrent.RNN();


nn.train(train_data, {
	errorThresh : 0.0005,	// error threshold to reach 0.005
	iterations : 20000,		// maximum training iterations
	log : true,				// console.log() progress periodically
	logPeriod : 1,			// number of iterations between logging
	learningRate : 0.1		// learning rate
});

app.saveJSON('nn/' + argv.nn, nn.toJSON());
