var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var dogSchema = new Schema({
	'name' : String,
	'breed': String,
	'age' : Number,
	'picture' : String,
	'description' : String
});

module.exports = mongoose.model('Dog', dogSchema);
