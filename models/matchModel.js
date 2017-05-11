const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const matchSchema = new Schema({
	'user1' : {type: Schema.Types.ObjectId, ref: 'User'},
    'user2' : {type: Schema.Types.ObjectId, ref: 'User'},
    'matched' : {type: Boolean, default: false}
});

matchSchema.setupTimestamp(true);

module.exports = mongoose.model('Match', matchSchema);
