module.exports = {
	setupConnections: () => {
		return new Promise((resolve, reject) => {
			// Load Connection Functions.
			let {
				dcConnect
			} = require('./discordConnection');
			let {
				twConnect
			} = require('./twitchConnection');

			// Create a map for the MongoDB Connections.
			global.connections = new Map();

			// Set default timeout for connecting.
			let timeout = 3000;

			// Execute MongoDB Connect.
			connect();

			function connect() {
				if (isLocalhost) logAll("Connecting to Localhost...", 'DEBUG');
				else logAll("Connecting to Server...", 'DEBUG');

				// Define Promises.
				let discordConnectionPromise = dcConnect();
				let twitchConnectionPromise = twConnect();
				Promise.all([discordConnectionPromise, twitchConnectionPromise]).then(res => {
					// Add the connections to the MongoDB connection Map.
					connections.set('dcConn', res[0]);
					connections.set('twConn', res[1]);
					return resolve();
				}).catch(err => {
					logAll(`Could not connect to the Databases retrying in ${timeout / 1000}secs...`, "warn");
					// Try to reconnect.
					setTimeout(() => {
						timeout += 3000;
						connect();
					}, timeout);
				})
			}
		})
	}
}