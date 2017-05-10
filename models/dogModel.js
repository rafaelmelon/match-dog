var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var dogSchema = new Schema({
	'name' : String,
	'breed': String,
	'age' : Number,
	'picture' : String,
	'pictureName' : String,
	'description' : String
});

dogSchema.setupTimestamp(true);

module.exports = mongoose.model('Dog', dogSchema);
