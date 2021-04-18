// Define Enviroment Variables.
require('../../util/findEnv').envFinder();
// Define Mongoose.
const mongoose = require('mongoose');

// Define Connection Config.
let connectionConfig = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	keepAlive: true,
	keepAliveInitialDelay: 30000,
	serverSelectionTimeoutMS: 5000
}

module.exports = {
	twConnect: function (timeout) {
		return new Promise((resolve, reject) => {
			let connectionString = "mongodb://localhost:27017/twitch";
			// Check if using localhost if not connect to server.
			if (!isLocalhost) connectionString = process.env.MONGO_TWITCH;
			mongoose.createConnection(connectionString, connectionConfig).then((connection) => {
				logAll(`Connected to Twitch-Database as: ${connection.id}`, 'DEBUG');
				return resolve(connection);
			}, (err) => {
				return reject(err);
			}).catch(err => {
				return reject(err);
			})
			mongoose.set('useCreateIndex', true);
		})
	}
}