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
var nn_data = app.loadJSON('nn/main');

var brain = require('brain.js');
var nn = new brain.NeuralNetwork({
	hiddenLayers: [256,64],
	learningRate: 0.1, // global learning rate, useful when training using streams
});

nn.fromJSON(nn_data);

var _input = {
	r : 1,
	//g : 0,
	b : 1
};

var _output = nn.run(_input);

train_data.push({
	input : _input,
	output : _output,
})

app.saveJSON('train/main', train_data);

app.saveJSON('nn/main', nn.toJSON());

console.log(_output);
