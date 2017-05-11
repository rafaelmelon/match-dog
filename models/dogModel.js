const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const dogSchema = new Schema({
	'name' : String,
	'breed': String,
	'age' : Number,
	'picture' : String,
	'pictureName' : String,
	'description' : String
});

module.exports = mongoose.model('Dog', dogSchema);
