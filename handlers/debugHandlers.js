const logger = require("../util/logger");

module.exports = {
	onError: (loggerMap) => {
		client.on('error', err => loggerMap.forEach(logger => logger.error(err.stack)));
	},
	onWarn: (loggerMap) => {
		client.on('warn', warn => loggerMap.forEach(logger => logger.warn(warn.stack)));
	},
	onDebug: (loggerMap) => {
		client.on('debug', debug => loggerMap.forEach(logger => logger.debug(debug)));
	},

	debugAll: (loggerMap) => {
		client.on('error', err => loggerMap.forEach(logger => logger.error(err.stack)));
		client.on('warn', warn => loggerMap.forEach(logger => logger.warn(`${warn}`)));
		client.on('debug', debug => loggerMap.forEach(logger => logger.debug(debug)));
	}
}