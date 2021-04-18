const mongoose = require("mongoose");
const Schema = mongoose.Schema;
module.exports = {
	credentialsSchema: mongoose.model('Credentials', new Schema({
		bearerToken: {
			type: String,
			unique: true,
			minLength: 18,
			maxLength: 18,
			required: true,
			trim: true
		},
		refreshToken: {
			type: String,
			minLength: 18,
			maxLength: 18,
			required: true,
			trim: true
		},
		time: {
			type: String,
			minLength: 2,
			maxLength: 100,
			required: true,
			trim: true
		},
		prefix: {
			type: String,
			default: '!',
			required: false,
			trim: true
		},
	}))
}