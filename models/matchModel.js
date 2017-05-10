const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const matchSchema = new Schema({
	'users' : [{type: Schema.Types.ObjectId, ref: 'User'}],
    'matched' : {type: boolean, default: false}
});

matchSchema.setupTimestamp(true);

module.exports = mongoose.model('Match', matchSchema);
