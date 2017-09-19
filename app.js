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

//var train_data = app.loadJSON('train_data');
var train_data = app.loadJSON('main');

var brain = require('brain.js');
var nn = new brain.NeuralNetwork({
	hiddenLayers: [4],
	learningRate: 0.6, // global learning rate, useful when training using streams
});

nn.fromJSON(train_data);

var output = nn.run({
	r : 1,
	g : 0,
	b : 1
});

app.saveJSON('main', nn.toJSON());

console.log(output);
