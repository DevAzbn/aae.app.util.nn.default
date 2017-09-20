'use strict';

var azbn = new require(__dirname + '/../../../../../system/bootstrap')({
	
});

var app = azbn.loadApp(module);

var argv = require('optimist')
	//.usage('Usage: $0 --path=[Path to root dir] --ext=[Fileext] --str=[String]')
	//.default('path', './')
	//.default('ext', '.php')
	//.demand(['str'])
	.argv
;

app.clearRequireCache(require);

var train_data = app.loadJSON('train/main');
//var train_data = app.loadJSON('autotrain');

//console.dir(train_data);


var brain = require('brain.js');
var nn = new brain.NeuralNetwork({
	hiddenLayers: [256,64],
	learningRate: 0.1, // global learning rate, useful when training using streams
});


nn.train(train_data, {
	errorThresh : 0.0005,	// error threshold to reach 0.005
	iterations : 20000,		// maximum training iterations
	log : true,				// console.log() progress periodically
	logPeriod : 1,			// number of iterations between logging
	learningRate : 0.1		// learning rate
});

app.saveJSON('nn/main', nn.toJSON());
