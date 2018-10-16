const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConditionSchema = new Schema ({
	condition: {
		type: String,
		required: true,
		unique: true
	},
	treatment: {
		type: String,
		default: null
	},
	prevention: {
		type: String,
		default: null
	},
	medication: {
		type: String,
		default: null
	},
	specialty: {
		type: String,
		default: null
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Conditions', ConditionSchema);