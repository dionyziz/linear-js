//var _ = require('lodash');
var Vector = require('./vector');
var Matrix = require('./matrix');

var a = new Vector([1, 2, 3]);
var b = new Vector([4, 5, 6]);

console.log(a.add(b).data);

//exports.Vector = Vector;
//exports.Matrix = Matrix;
