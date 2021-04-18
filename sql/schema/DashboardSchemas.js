import {
	Mongoose
} from 'mongoose';
const {
	Schema
} = Mongoose;

module.exports = {
	userSchema: new Schema({
		userID: {
			type: String,
			required: true,
			unique: true,
			minLength: 18,
			maxLength: 18
		},
		username: {
			type: String,
		}
	})
}