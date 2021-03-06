'use strict';

var azbn = new require(__dirname + '/../../../../../system/bootstrap')({
	
});

var app = azbn.loadApp(module);

var argv = require('optimist')
	.usage('Usage: $0 --nn=[Name of neural network]')
	.default('nn', 'main')
	//.default('ext', '.php')
	//.demand(['str'])
	.demand(['x'])
	.demand(['b'])
	.argv
;

app.clearRequireCache(require);

var train_data = app.loadJSON('normal/' + argv.nn);
var cfg_data = app.loadJSON('cfg/' + argv.nn);
var nn_data = app.loadJSON('nn/' + argv.nn);

var brain = require('brain.js');

var nn = new brain.NeuralNetwork(cfg_data);

//var nn = new brain.recurrent.RNN();

nn.fromJSON(nn_data);

var _input = {
	x : (1/(1 + (Math.exp(- argv.x)))),
	//g : 0,
	b : (1/(1 + (Math.exp(- argv.b)))),
};

var _output = nn.run(_input);

/*
train_data.push({
	input : _input,
	output : _output,
})

app.saveJSON('train/' + argv.nn, train_data);

app.saveJSON('nn/' + argv.nn, nn.toJSON());
*/

console.log(_output);
