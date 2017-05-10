const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const messageSchema = new Schema({
	'from' : {type: Schema.Types.ObjectId, ref: 'User'},
	'text' : String,
	'match': {type: Schema.Types.ObjectId, ref: 'Match'}
});

messageSchema.setupTimestamp(true);

module.exports = mongoose.model('Message', messageSchema);
