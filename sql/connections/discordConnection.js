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
	dcConnect: function () {
		return new Promise((resolve, reject) => {
			let connectionString = "mongodb://localhost:27017/discord";
			// Check if using localhost if not connect to server.
			if (!isLocalhost) connectionString = process.env.MONGO_DISCORD;

			mongoose.createConnection(connectionString, connectionConfig).then((connection) => {
				logAll(`Connected to Discord-Database as: ${connection.id}`, 'DEBUG')
				return resolve(connection);
			})
			mongoose.set('useCreateIndex', true);
		}).catch(err => {
			return reject(err);
		})
	}
}