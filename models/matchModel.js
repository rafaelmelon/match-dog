var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var matchSchema = new Schema({
	'users' : [{type: Schema.Types.ObjectId, ref: 'User'}],
    'matched' : {type: boolean, default: false}
});

matchSchema.setupTimestamp(true);

module.exports = mongoose.model('Match', matchSchema);
